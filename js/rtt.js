// use IIFE to isolate namespace
//(function rttCharts() {
  var margin = {top: 30, right: 20, bottom: 60, left: 100},
      width = 400,
      height = 400,
      svg = d3.select("div#unrooted")
              .append("svg")
              .attr("width", width)
              .attr("height", height)
              .append("g");

  var width2 = 400,
      height2 = 400;

  var svg2 = d3.select("div#rtt")
               .append("svg")
               .attr("width", width2 + margin.left + margin.right)
               .attr("height", height2 + margin.top + margin.bottom)
               .append("g")
               .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  // set up plotting scales
  var xValue = function(d) { return d.x; },
      xScale = d3.scale.linear().range([0, width]),
      xMap = function(d) { return xScale(xValue(d)); },  // points
      xMap1 = function(d) { return xScale(d.x1); },  // lines
      xMap2 = function(d) { return xScale(d.x2); },
      xAxis = d3.svg.axis().scale(xScale).orient("bottom");

  var yValue = function(d) { return d.y; },
      yScale = d3.scale.linear().range([height, 0]),
      yMap = function(d) { return yScale(yValue(d)); },
      yMap1 = function(d) { return yScale(d.y1); },
      yMap2 = function(d) { return yScale(d.y2); },
      yAxis = d3.svg.axis().scale(yScale).orient("left");


  // set up plotting scales
  var tValue = function(d) { return d.year; },
      x2Scale = d3.scale.linear().range([0, width2]),  // map domain to range
      x2Map = function(d) { return x2Scale(tValue(d)); },
      x2Axis = d3.svg.axis().scale(x2Scale).orient("bottom").tickFormat(d3.format("d")).ticks(6);

  var dValue = function(d) { return d.x / 1000; },
      y2Scale = d3.scale.linear().range([height2, 0]),
      y2Map = function(d) { return y2Scale(dValue(d)); },
      y2Axis = d3.svg.axis().scale(y2Scale).orient("left").ticks(6);

  // color palette
  var palette = d3.scale.category20();

  var tree = readTree(ebola);
  equalAngleLayout(tree);

  var data = fortify(tree, sort=true),
      edgeset = edges(data);

  // add buffer to data domain
  xScale.domain([
      d3.min(data, xValue)-1, d3.max(data, xValue)+1
  ])
  yScale.domain([
      d3.min(data, yValue)-1, d3.max(data, yValue)+1
  ])

  // parse tip dates
  for (const i in data) {
    if (data[i].isTip) {
      data[i].year = Number(data[[i]].thisLabel);
    }
    else {
      data[i].year = null;
    }
  }

  // draw lines
  svg.selectAll("lines")
     .data(edgeset)
     .enter().append("line")
     .attr("class", "lines")
     .attr("x1", xMap1)
     .attr("y1", yMap1)
     .attr("x2", xMap2)
     .attr("y2", yMap2)
     .attr("stroke-width", 3)
     .attr("stroke", "#777");


   // draw points
   svg.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("r", function(d) {
        if (d.isTip) {
          return(6);
        } else {
          return(4);
        }
      })
      .attr("cx", xMap)
      .attr("cy", yMap)
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("fill", function(d) {
        if (d.isTip) {
          return(palette(d.thisId));
        } else {
          return("white");
        };
      });

  // TODO: draw tip labels (years)

  // draw the meatball
  var circle1 = svg.append("circle")
                  .attr("cx", xScale(0))
                  .attr("cy", yScale(0))
                  .attr("r", 10)
                  .attr("stroke", "black")
                  .attr("stroke-width", 2)
                  .attr("fill", "gold");

  // draw initial rooted tree
  var rootedTree = rerootTree( closestEdge([xScale(0), yScale(0)]) );
  rootedLayout(rootedTree);
  
  var origin = 1900,
      rSquared = 0;
  drawScatter(rootedTree);


  // check if mouse button is pressed
  var mouseDown = false;
  document.body.onmousedown = function() { mouseDown = true; }
  document.body.onmouseup = function() { mouseDown = false; }

  // add interface layer
  svg.append("rect")
     .attr("width", width)
     .attr("height", height)
     .on("mousemove", function() {
         if (mouseDown) {
          var m = d3.mouse(this),
              p = closestEdge(m),
              rootedTree;

           // move the root
           circle1.attr("cx", xScale(p.x))
                  .attr("cy", yScale(p.y));

           // update nodes
           rootedTree = rerootTree(p);
           rootedLayout(rootedTree);
           //console.log(rootedTree);

           // update rooted tree
           updateScatter(rootedTree);
         }
     });

  // find closest edge to mouse
  function closestEdge(ptr) {
      // unpack mouse coordinates
      var px = ptr[0],
          py = ptr[1],
          dx, dy,
          adj1, adj2,  // adjacent
          hyp1, hyp2,  // hypoteneuse
          part, blen,  // partition of branch length
          dist, mindist = Infinity,
          minpart, minblen, closest;

      for (const e of edgeset) {
        // first, calculate the hypoteneuse (distance
        // from ptr to each node)
        dx = px - xScale(e.x1);
        dy = py - yScale(e.y1);
        hyp1 = dx*dx + dy*dy;  // no sqrt

        dx = px - xScale(e.x2);
        dy = py - yScale(e.y2);
        hyp2 = dx*dx + dy*dy;  // no sqrt

        // branch length at user scale
        dx = xScale(e.x1) - xScale(e.x2);
        dy = yScale(e.y1) - yScale(e.y2);
        blen = Math.sqrt(dx*dx + dy*dy);

        // next, calculate branch length part
        // note we left hyp1 and hyp2 squared
        part = (hyp1 - hyp2 + blen*blen) /
                (2*blen);
        if (part < 0 || part > blen) {
            continue;
        }

        // finally calculate distance to branch
        dist = Math.sqrt(hyp1 - part*part);
        //console.log(part, blen, dist);

        if (dist < mindist) {
            mindist = dist;
            minpart = part;  // this is useful
            minblen = blen;
            closest = e;
        }
      }

      // solve for coordinates of point on closest edge
      var p = minpart/minblen;

      return ({
          x: (1-p)*closest.x1 + p*closest.x2,
          y: (1-p)*closest.y1 + p*closest.y2,
          p: p, child: closest.id1, parent: closest.id2
      });
  }

  //============================================================//
  // to plot the rooted tree, we need to calculate the cumulative
  // branch lengths


  function rerootTree(p) {
    var nodes = JSON.parse(JSON.stringify(data)),  // deep copy
        row, parent, child, root, blen;

    // append root node to array
    root = {
      parentId: undefined,
      parentLabel: undefined,
      thisId: nodes.length,
      thisLabel: "root",
      isTip: false,
      year: null,
      children: [p.parent, p.child],
      angle: 0,
      branchLength: 0.,
      x: p.x,
      y: p.y
    };
    nodes.push(root);

    // root becomes parent of child node
    row = nodes[p.child];
    row.parentId = root.thisId;
    row.parentLabel = root.thisLabel;
    blen = row.branchLength;
    row.branchLength = blen*p.p;

    // reverse flow from parent node to original root
    row = nodes[p.parent];
    var queue = [p.parent];
    while (row.thisId != (nodes.length-2)) {
      parent = row.parentId;
      queue.push(parent);
      row = nodes[parent];
    }
    // now, starting from the root...
    for (var i=queue.length; i>1; i--) {
      parent = nodes[queue[i-1]];
      child = nodes[queue[i-2]];

      child.children.push(parent.thisId);
      parent.parentId = child.thisId;
      parent.children.splice(parent.children.indexOf(child.thisId), 1);
    }

    // root becomes parent of parent node
    row = nodes[p.parent];
    row.parentId = root.thisId;
    row.parentLabel = root.thisLabel;
    row.branchLength = blen*(1-p.p);

    // child node removed from parent node's children
    row.children.splice(row.children.indexOf(p.child), 1);

    return(nodes);
  }


  function nodeDepth(idx, nodes) {
    /*
     *  Calculate the distance of each node from the root.
     */
    var node = nodes[idx],
        parent;

    if (node.parentId === undefined) {
      // root
      node.x = 0;
    } else {
      parent = nodes[node.parentId];
      node.x = parent.x + node.branchLength;
    }

    for (const child of node.children) {
      // recursion
      nodeDepth(child, nodes);
    }
  }


  function countTips(idx, nodes) {
    // recursive function to annotate nodes with number of tips
    var node = nodes[idx],
        child;

    if (node.isTip) {
      node.ntips = 1;
    }
    else {
      node.ntips = 0;
      for (const childIdx of node.children) {
        node.ntips += countTips(childIdx, nodes);
      }
    }
    return (node.ntips);
  }

  function postOrderByIndex(idx, nodes, list=[]) {
    // recursive function to generate a list of node indices
    // that orders children before parents
    var node = nodes[idx],
        temp = [],
        child;

    // sort children by number of tips
    for (const childIdx of node.children) {
      child = nodes[childIdx];
      temp.push(child);
    }
    temp.sort(function(a, b) {
        return a.ntips - b.ntips;
    })

    for (const childIdx of temp.map(x=>x.thisId)) {
      // append child indices to list
      list = postOrderByIndex(childIdx, nodes, list);
    }
    list.push(node);
    return(list);
  }

  function getTips(nodeIndex, nodes) {
    // recursive function to annotate nodes with the
    // y-position of tips
    var node = nodes[nodeIndex],
        child;
    if (node.isTip) {
      node.y = [node.y];
      return(node.y);
    }

    node.y = [];
    for (const childIdx of node.children) {
      node.y = node.y.concat(getTips(childIdx, nodes));
    }
    return(node.y);
  }


  function rootedLayout(nodes) {
    // calculates (x,y) coordinates for tips
    // TODO: calculate coordinates for internal nodes
    //
    // @param nodes: return value from rerootTree()
    var rootIdx = nodes.length-1;

    // calculate node depths - populates node.x
    nodeDepth(rootIdx, nodes);

    // count tips per nodes to ladderize tree
    countTips(rootIdx, nodes);

    // order tips by postorder traversal
    var orderedNodes = [];
    postOrderByIndex(rootIdx, nodes, orderedNodes);

    var tips = orderedNodes.filter(node=>node.isTip),
        ntips = tips.length;
    for (var i=0; i<ntips; i++) {
      tips[i].y = (i+0.5)/ntips;  // this is carried over to nodes
    }

    // calculate vertical location of internal nodes
    getTips(rootIdx, nodes);
    for (var node of nodes) {
      var temp = 0;
      for (const y of node.y) {
        temp += y;
      }
      node.y = temp / node.y.length;
    }
  }
  
  var tips;
  
  function regression(nodes) {
    const sum = (accumulator, currentValue) => accumulator + currentValue;
    
    var tips = nodes.filter(node => node.isTip),
        n = tips.length,
        x = tips.map(a => a.year),
        y = tips.map(a => a.x),
        xy = tips.map(a => a.year * a.x);
        
    var sumX = x.reduce(sum),
        sumY = y.reduce(sum),
        sumXY = xy.reduce(sum),
        x2 = x.map(a => a*a),
        y2 = y.map(a => a*a),
        sumX2 = x2.reduce(sum),
        sumY2 = y2.reduce(sum);
    
    // maximum likelihood estimators - JA Rice (1988) page 455
    var varX = n*sumX2 - sumX*sumX,
        interceptY = (sumX2 * sumY - sumX * sumXY) / varX,
        slope = (n*sumXY - sumX*sumY) / varX;
    
    tips.forEach(function(node) {
      node.yhat = (node.year * slope + interceptY) / 1000;
    });
    
    // update statistics
    origin = -interceptY / slope;
    if (origin < 0 | origin > 2018) {
      origin = "undefined";
    }
    
    // explained sum of squares
    var ess = tips.map(node => (node.yhat - node.x/1000)**2);
    ess = ess.reduce(sum);
    
    // total sum of squares
    var tss = tips.map(node => (node.x/1000 - sumY/(1000*n))**2);
    tss = tss.reduce(sum);
    rSquared = 1-ess/tss;
    
    return(tips);
  }

  function drawScatter(nodes) {
    //console.log(nodes);

    // scale vertical axis of SVG to node depths
    x2Scale.domain([
      d3.min(nodes, tValue)-1, d3.max(nodes, tValue)+1
    ]);
    // xValue retrieves .x
    y2Scale.domain([
      d3.min(nodes, xValue), d3.max(nodes, dValue)
    ]);

      svg2.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0," + height2 + ")")
          .call(x2Axis);
       
      svg2.append("text")
          .attr("class", "label")
          .attr("transform", "translate(" + width2/2 + "," + (height2+50) + ")")
          .style("text-anchor", "middle")
          .text("Year of sample collection");

      svg2.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(0,0)")
          .call(y2Axis);
          
      svg2.append("text")
          .attr("class", "label")
          .attr("transform", "translate(-70,"+(height2/2)+"),rotate(270)")
          .style("text-anchor", "middle")
          .text("Distance from root");
      
      tips = regression(nodes);
      
      svg2.append("text")
          .attr("class", "origin")
          .attr("transform", "translate(0,-10)")
          .style("text-anchor", "start")
          .text("Origin: " + Math.round(origin));
      
      svg2.append("text")
          .attr("class", "r2")
          .attr("transform", "translate(200,-10)")
          .style("text-anchor", "start")
          .text("R2: " + 100*Math.round(rSquared*1e4) / 1e4 + "%");
          
      var rline = d3.svg.line()
        .x(function(d) { return x2Scale(d.year); })
        .y(function(d) { return y2Scale(d.yhat); });
    
      svg2.append("path")
          .attr("d", rline(tips))
          .attr("class", "line")
          .attr("stroke", function () {
            if (origin == "undefined") { 
              return "#b2222299"; 
            } else { 
              return "#5f9ea099";
            }
            })
          .attr("stroke-width", function() {
            return rSquared*100+5;
          });
          
    svg2.selectAll(".dot")
      .data(nodes)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 6)
      .attr("cx", x2Map)
      .attr("cy", y2Map)
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .attr("fill", function(d) {
        if (d.isTip) {
          return(palette(d.thisId));
        } else {
          return("white");
        };
      });
  }

  function updateScatter(nodes) {
    // call to update
    y2Scale.domain([
      d3.min(nodes, dValue), d3.max(nodes, dValue)
    ]);

    svg2.selectAll("g .y.axis").call(y2Axis);
    
    tips = regression(nodes);
    
    // FIXME: this is defined twice :-P
    var rline = d3.svg.line()
      .x(function(d) { return x2Scale(d.year); })
      .y(function(d) { return y2Scale(d.yhat); });
    
    svg2.select("path.line")
        .attr("stroke", function () {
            if (origin == "undefined") { 
              return "#b2222299"; 
            } else { 
              return "#5f9ea099";
            }
            })
        .attr("stroke-width", function() {
          return (rSquared*100+5);
        })
        .attr("d", rline(tips));
    
    svg2.selectAll(".dot")
        .data(nodes)
        .transition().duration(100)
        .ease('linear')
        .attr("cx", x2Map)
        .attr("cy", y2Map);
        
    svg2.select("text.origin")
        .text("Origin: " + Math.round(origin));
        
    svg2.select("text.r2")
        .text("R2: " + 100*Math.round(rSquared*1e4) / 1e4 + "%");
  }
//}());

