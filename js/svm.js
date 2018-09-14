// derived from http://bl.ocks.org/weiglemc/6185069

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// setup x 
var xValue = function(d) { return d.Odd;}, // data -> value
    xScale = d3.scale.linear().range([0, width]), // value -> display
    xMap = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");

// setup y
var yValue = function(d) { return d.Weight;}, // data -> value
    yScale = d3.scale.linear().range([height, 0]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");


var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// draw guidelines
svg.append("line")
  .attr("x1", xScale(0))
  .attr("y1", yScale(0.4))
  .attr("x2", xScale(1))
  .attr("y2", yScale(0.4))
  .attr("stroke-width", 2)
  .attr("stroke", "#ccc");
  
svg.append("line")
  .attr("x1", xScale(0.4675))
  .attr("y1", yScale(0))
  .attr("x2", xScale(0.4675))
  .attr("y2", yScale(1))
  .attr("stroke-width", 2)
  .attr("stroke", "#ccc");

var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);  


d3.csv("/data/svm.csv", function(data) {
    //console.log(data[0]);
 
    data.forEach(function(d) {
        d.Weight = +d.Weight;  // cast string as number
        d.Odd = Math.log10(+d.Odd);
        d.lower = +d.lower;
        d.upper = +d.upper;
    });

    xScale.domain([d3.min(data, xValue)-0.1, d3.max(data, xValue)+0.1]);
    yScale.domain([d3.min(data, yValue)-0.02, d3.max(data, yValue)+0.02]);
  
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Log odds ratio");

  // y-axis
  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Feature weight");

  svg.selectAll(".dot")
    .data(data)
    .enter().append("circle")
    .attr("class", "dot")
    .attr("r", function(d) {
      if ((d.Odd > 1 && d.lower > 1) || (d.Odd < 1 && d.upper < 1)) {
        return 8;
      } else {
        return 4;
      }
    })
    
    // start in upper left corner
    .attr("cx", 0)//xMap)
    .attr("cy", 0)//yMap)
    
    // color by odds ratio
    .style("fill", function(d) {
      if (d.Odd > 1 && d.lower > 1) {
        return "#1f77b4";
      } 
      if (d.Odd < 1 && d.upper < 1) {
        return "#b22222";
      }
      return "#bbb";
    })
    
    // enable mouse-over tooltips
    .on("mouseover", function(d) {
      tooltip.transition()
        .duration(200)
        .style("opacity", .9);
      tooltip.html(d["Residue"])
        .style("left", (d3.event.pageX + 5) + "px")
        .style("top", (d3.event.pageY - 10) + "px");
      d3.select(this).style("r", 15);
    })
    
    .on("mouseout", function(d) {
      tooltip.transition()
      .duration(500)
      .style("opacity", 0);
      d3.select(this).style("r", function(d) {
        if ((d.Odd > 1 && d.lower > 1) || (d.Odd < 1 && d.upper < 1)) {
          return 8;
        } else {
          return 4;
        }
      });
    })
  
    // animate the points!
    .transition()
    .duration(1000)
    .attr("cx", xMap)
    .attr("cy", yMap)
});

// FIXME: this doesn't work...
d3.select('body').on("keydown", function () {
  console.log(d3.event.keyCode);
  if (d3.event.keyCode==16) {
    console.log('shift')
    d3.selectAll('.tooltip').each(function() {
    })
  }
});


