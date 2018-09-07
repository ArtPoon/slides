
var _transitions = [],
    _inverse_transitions = [];

// from http://bl.ocks.org/hugolpz/cd89b50d834828261b45af9e7a5ce926
var graph;
var vis;
var data = {};

function myGraph() {
    this.addNode = function(id, geno, r) {
        nodes.push({"id": id, "geno": geno, "r": r})
        update();
    };

    this.removeNode = function(id) {
        var i = 0;
        var n = this.findNode(id);
        if (n == null) {
            // no node with this 'id'
            return;  // returns undefined
        }

        while (i < links.length) {
            if ((links[i]['source'] == n) || (links[i]['target'] == n)) {
                // remove links that connect to this node
                links.splice(i, 1);
            }
            else i++;
        }
        nodes.splice(this.findNodeIndex(id), 1);
        update();
    };

    this.removeLink = function (source, target) {
        // remove directed edge between nodes with given IDs, if it exists
        var link;
        for (var i = 0; i < links.length; i++) {
            link = links[i];
            if (link.source.id == source && link.target.id == target) {
                links.splice(i, 1);
                break;
            }
        }
        // if no matching edge, no big deal
        update();
    };

    this.removeAllLinks = function () {
        links.splice(0, links.length);
        update();
    };

    this.removeAllNodes = function () {
        nodes.splice(0, nodes.length);
        update();
    };

    this.addLink = function(source, target, dist) {
        /*
            Add link object to [links] Array between nodes specified
            by IDs.
            @param source: ID of parent node
            @param target: ID of child node
            @param dist: distance attribute (float)
         */
        var node1 = this.findNode(source),
            node2 = this.findNode(target);

        if (node1 == null || node2 == null) {
            return;  // do nothing
        }
        links.push({"source": node1, "target": node2, "dist": dist});
        update();
    };


    /* accessor functions */
    this.findNode = function(id) {
        // search through Array of node objects and return the object
        // with the requested (id)
        for (var i in nodes) {  // for..in iterates over indices
            if (nodes[i]["id"] === id) return nodes[i];
        }
        console.log("Warning: failed to retrieve node with id: "+id);
        return null;
    };

    this.findNodeIndex = function(id) {
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].id == id) {
                return i;
            }
        }
        console.log("Warning: failed to index node witih id: " + id);
        return null;
    };

    // =================== set up d3 ===================
    var w = 960,  // width
        h = 700;  // height

    var color = d3.scale.ordinal()
        .domain(["S", "I", "R"])
        .range(["#266A2E", "#FFA500", "#B22222"]);

    vis = d3.select("body")
                .append("svg:svg")
                .attr("width", '98%')
                .attr("height", '98%')
                .attr("id", "mySvg")
                .attr("pointer-events", "all")
                .attr("viewBox", "0 0 " + w + " " + h)
                .attr("perserveAspectRatio", "xMinYMid meet")
                .append('svg:g');

    // position linked nodes using physical simulation
    var force = d3.layout.force();

    var nodes = force.nodes(),
        links = force.links();

    var update = function() {
        var link = vis.selectAll("line")
                .data(links, function (d) {
                    return d.source.id + "-" + d.target.id;
                });

        link.enter().append("line")
            .attr("id", function (d) {
                return d.source.id + '-' + d.target.id;
            })
            .attr("class", "link");
        link.exit().remove();

        var node = vis.selectAll("g.node")
            .data(nodes, function(d) {
                return d.id;
            });

        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .call(force.drag);

        nodeEnter.append("svg:circle")
            .attr("r", function (d) { return 100*d.r; })
            .attr("id", function (d) { return d.id; })
            .attr("class", "nodeStrokeClass")
            .attr("fill", function(d) { return color(d.geno); });

        node.exit().remove();

        force.on("tick", function() {
            node.attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
        });

        // restart the force layout
        force.charge(-500)
             .linkDistance(function(d) {
                return 200*d.dist;
             })
             .size([w, h])
             .start();
    };

    update();  // go!
}

d3.csv("/data/cluster55.nodes.csv", function(d) {
    data.nodes = d;  // hand off to global var
    d3.csv("/data/cluster55.edges.csv", function(d) {
        data.links = d;
        drawGraph("cluster55");
    });
});


function drawGraph() {
    graph = new myGraph();

    for (var i = 0; i < data.nodes.length; i++) {
        node = data.nodes[i];
        if (node.group=="0") {
            graph.addNode(node.id, node.geno, node.r);
        }
    }

    for (var i = 0; i < data.links.length; i++) {
        link = data.links[i];

        for (var j = 0; j < data.nodes.length; j++) {
            node = data.nodes[j];
            if (node.id == link.source) {
                node1 = node;
            }
            if (node.id == link.target) {
                node2 = node;
            }
        }

        if (node1.group=="0" && node2.group=="0") {
            graph.addLink(link.source, link.target, link.dist);
        }
    }
    keepNodesOnTop();
}




function keepNodesOnTop() {
    $(".nodeStrokeClass").each(function( index ) {
        var gnode = this.parentNode;
        gnode.parentNode.appendChild(gnode);
    });
}

// TODO: I should probably be using the "General Update Pattern"?
//   https://bl.ocks.org/mbostock/3808218

// June
_transitions.push(
    () => {
        for (var i = 0; i < data.nodes.length; i++) {
            node = data.nodes[i];
            if (node.group=="1") {
                graph.addNode(node.id, node.geno, node.r);
            }
        }

        for (var i = 0; i < data.links.length; i++) {
            link = data.links[i];

            for (var j = 0; j < data.nodes.length; j++) {
                node = data.nodes[j];
                if (node.id == link.source) {
                    node1 = node;
                }
                if (node.id == link.target) {
                    node2 = node;
                }
            }

            if (node1.group=="1" || node2.group=="1") {
                graph.addLink(link.source, link.target, link.dist);
            }
        }
        keepNodesOnTop();
        $("#c55label").text("2014 April - 2014 June");
    }
);

_inverse_transitions.push(
    () => {
        for (var i = 0; i < data.nodes.length; i++) {
            node = data.nodes[i];
            if (node.group=="1") {
                graph.removeNode(node.id);
            }
        }

        for (var i = 0; i < data.links.length; i++) {
            link = data.links[i];

            for (var j = 0; j < data.nodes.length; j++) {
                node = data.nodes[j];
                if (node.id == link.source) {
                    node1 = node;
                }
                if (node.id == link.target) {
                    node2 = node;
                }
            }

            if (node1.group=="1" || node2.group=="1") {
                graph.removeLink(link.source, link.target);
            }
        }
        keepNodesOnTop();
        $("#c55label").text("2014 March");
    }
);

// after public health response
_transitions.push(
    () => {
        // one new infection
        graph.addNode("HLWHGTWTTA", "R", 0.05);

        // update viral loads
        // FIXME: this doesn't work
        var vnodes = ["GAHWLLLADH", "GGUNIGLDHL", "GITGUWWDLT", "GLWAUTHLGL", "GTUUDTNNDN", "GUTDNHTTAA", "HHALUNAUUN", "HNDTDWGNWI", "HTAAIUHNUA", "HUWHUAIDHW", "NNLNNUAWA", "TAULIIWGT", "UGAGLLUIL", "UHTDNAUHUN", "UWHUGWGWNG"];
        var vloads = [0.05, 0.187932, 0.05, 0.05, 0.05, 0.173827, 0.05, 0.05, 0.05, 0.226749, 0.05, 0.05, 0.205068, 0.24799, 0.270929, 0.05];
        for (var i = 0; i < vnodes.length; i++) {
            vnode = graph.findNode(vnodes[i]);
            vnode.r = vloads[i];
        }
        vis.selectAll("g.node")
           .attr("r", function(d) { return 100*d.r; });


        // wire up the new node
        var targets = ["GAHWLLLADH", "GGUNIGLDHL", "GLAWATIIGT", "GLWAUTHLGL", "GTUUDTNNDN", "GTWWHGNWHU", "GUTDNHTTAA", "HHALUNAUUN", "HHTUUANAGN", "HITTILWHUA", "DNULGNUIU", "LTLIGDGLU", "NNLNNUAWA", "TGLDTUGHII", "THALNTTHNW", "TWDDNHNGT", "ULALWIHHD", "UUWAULWHNI", "UWHUGWGWNG", "UWWGHLNWA", "WDGAGUIGT", "HNDTDWGNWI", "HTAAIUHNUA", "HUWHUAIDHW"];
        var dists = [0.3545, 0.7485, 0.7885, 0.7305, 0.607, 0.3155, 0.4865, 0.2375, 0.1825, 0.343, 0.2375, 0.3335, 0.5875, 0.3155, 0.2635, 0.084, 0.5455, 0.5685, 0.249, 0.6655, 0.6465, 0.6105, 0.6925, 0.547];
        for (var i = 0; i < targets.length; i++) {
            graph.addLink("HLWHGTWTTA", targets[i], dists[i]);
        }
        keepNodesOnTop();
        $("#c55label").text("2014 July - 2015 January");
    }
)

_inverse_transitions.push(
    () => {
        graph.removeNode("HLWHGTWTTA");  // should take care of the links too
        $("#c55label").text("2014 April - 2014 June");
        keepNodesOnTop();
    }
);
