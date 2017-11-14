/*
Based on code from https://networkx.github.io/_static/force/force.js
 */


var w = 2000,
    h = 1500,
    //fill = d3.scale.category20(); // Constructs a new ordinal scale with a range of twenty categorical colors
    fill = ["#266A2E", "#FFA500", "#B22222"];  // forestgreen, orange, firebrick for S, I, R

var date_toggle = false;

var vis = d3.select("#chart")
    .append("svg:svg")  // create and append a new element (namespace:tag)
    .attr("width", w)
    .attr("height", h);

//d3.json("force.json", function(json) {  // request a JSON blob (url, callback)

function linkDropdown() {
    var dropdown = $('#dropdown');
    console.log(dropdown.selectedIndex);
    $('#slider').slider('value', dropdown.selectedIndex+1);
    draw();
}

// how does this know to act on the SVG element 'vis'?
function draw() {
    // clear all elements from SVG
    d3.selectAll("svg > *").remove();

    // query select to get cluster ID
    var cid = $('#dropdown')[0].value;
    var json = data[cid];

    // position linked nodes using physical simulation
    var force = d3.layout.force()
        .charge(-200)
        .nodes(json.nodes)
        .linkDistance(function(d) { return 150*d.dist; })
        .links(json.links)
        .size([w, h])
        .start();  // starts the simulation

    var link = vis.selectAll("line.link")
        .data(json.links)
        .enter().append("svg:line")
        .attr("class", "link")
        .attr("stroke-width", 2)
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    var node = vis.selectAll("circle.node")
        .data(json.nodes)
        .enter().append("svg:circle")
        .attr("class", "node")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", function(d) { return 5*d.r; })
        .style("fill", function(d) { return fill[d.group]; })
        .call(force.drag);

    var labels = vis.selectAll("text.label")
        .data(json.nodes)
        .enter().append("text")
        .attr("class", "label")
        .attr("fill", "black")
        .text(function(d) {
            return moment([1990,1,1]).add(d.days, 'days').format('MMM YYYY');
        });


    // labels nodes with title attribute
    //node.append("svg:title").text(function(d) { return moment([1990,1,1]).add(d.days, 'days').format('YYYY-MM-DD'); });

    vis.style("opacity", 1e-6)
        .transition()
        .duration(1000)  // how long to animate cluster rendering
        .style("opacity", 1);


    // listen to updates in the computed layout positions
    force.on("tick", function() {  // events dispatched for each tick of simulation
        // update displayed positions of nodes and links
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });

        labels.attr("transform", function(d) {
            return "translate(" + (d.x+5*d.r) + "," + d.y + ")";
        }).style("display", date_toggle ? "inline" : "none");
    });

    d3.select(window).on("keydown", keydown);
    function keydown() {
        if (d3.event.keyCode==32) {
            if (force.alpha() == 0) {
                force.resume();
            } else {
                force.stop();
            }
        }
        else if (d3.event.keyCode>=48
            && d3.event.keyCode<=90
            && !d3.event.ctrlKey
            && !d3.event.altKey
            && !d3.event.metaKey) {
            var key_pressed = String.fromCharCode(d3.event.keyCode);
            if (key_pressed == "D") {
                date_toggle = !date_toggle;
                if (force.alpha() == 0) {
                    // animation stopped, force redraw labels
                    labels.attr("transform", function(d) {
                        return "translate(" + (d.x+5*d.r) + "," + d.y + ")";
                    }).style("display", date_toggle ? "inline" : "none");
                }
            }
            //console.log(key_pressed);
        }
    }

    // scroll div overflow to center of svg

}
