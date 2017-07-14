import * as d3 from 'd3'
import { showDetail } from '../app/actions/actionsCreators.js'

const data = ["hello world"]

const drawCircle = function(x, y, size) {

  var elem = d3.select("svg").selectAll("g myCircleText")
                .data(data)

  var elemEnter = elem.enter()
    .append("g")
    .attr("transform", function(d){ return "translate("+x+","+y+")"})

  var circle = elemEnter.append("circle")
    .attr("r", size)
    .attr("stroke","black")
    .attr("fill","white")

  elemEnter.append("text")
    .attr("dx", function(d){return -20})
    .text(function(d){return data[0]})

  elemEnter.on('click', function() {
    console.log('clicked!')
  })

  // d3.select('svg').append("circle")
  //     .attr("cx", x)
  //     .attr("cy", y)
  //     .attr("r", size)
  //     .style("color","pink");
}

export const click = function() {
  var coords = d3.mouse(d3.select('svg').node());
  drawCircle(coords[0], coords[1], 50);
}

export const blackCircle = function(parentEl) {
  parentEl.append("circle")
    .attr("r", 50)
    .attr("cx", 500)
    .attr("cy", 700)
    .attr("stroke", "black")
    .attr("fill", "white")
}

// .node {
//     fill: #ccc;
//     stroke: #fff;
//     stroke-width: 2px;
// }

// .link {
//     stroke: #777;
//     stroke-width: 2px;
// }

// export const forceDiagram = function(parentEl) {


//   //defined nodes
//   var nodes = [
//     {x: 213, y: 240},
//     {x: 426, y: 240}
//   ]

//   //define links
//   var links = [
//     {source: 0, target: 1}
//   ]
//   //define the force layout
//   var force = d3.layout.force()
//     .size([1004, 722])
//     .nodes(nodes)
//     .links(links);

//   //define link distance
//   force.linkDistance(213)

//   //add the links (ORDER IS IMPORTANT. ADD LINKS FIRST SO NODES WILL APPEAR ON TOP)
//   //links are added to the svg as a simple line. The force layout will take care of
//   //positioning them appropriately

//   var link = parentEl.selectAll('.link')
//     .data(links)
//     .enter().append('line')
//     .attr('stroke', '#777')
//     .attr('stroke-width', '2px')

//   //now for the nodes. Each one is just a cricle

//   var node = parentEl.selectAll('.node')
//     .data(nodes)
//     .enter().append('circle')
//     .attr('fill', '#ccc')
//     .attr('stroke', '#fff')
//     .attr('stroke-width', '2px')

//   //now we tell the force layout to start its calculations. We want to know when it
//   //has finished its calculations, so we define a function for it to run when it does

//   force.on('end', function() {
//     console.log('force calc ended')

//     //when the calcs are complete, the force layout will have set various properties
//     //on our nodes and links that we can use to position them

//     //reposition the nodes. We re-set the nodes' svg attributes for x, y, and radis
//     //to the results of the calculations

//     node.attr('r', 40)
//         .attr('cx', function(d) { return d.x })
//         .attr('cy', function(d) { return d.y });

//     //now we do the same for the links, updating the source and target props with x
//     //and y values

//     link.attr('x1', function(d) { return d.source.x })
//         .attr('y1', function(d) { return d.source.y })
//         .attr('x2', function(d) { return d.target.x })
//         .attr('y2', function(d) { return d.target.y })
//   })

//   //now we start the force layout going

//   force.start();
// }

export const width = 960;
export const height = 500;
export const force = d3.layout.force()
            .charge(-500)
            .linkDistance(100)
            .size([width, height]);


export const enterNode = (selection) => {

  selection.classed('node', true);

  selection.append('circle')
    .attr("r", (d) => d.size)
    .attr("fill", "white")
    .attr("stroke", "black")
    .call(force.drag)

}

export const updateNode = (selection) => {
  selection.attr("transform", (d) => "translate(" + d.x + "," + d.y + ")")

}

export const enterLink = (selection) => {

  selection.classed('link', true)
    .attr("stroke", "#cccccc")
    .attr("stroke-opacity", ".6;")
    .attr("stroke-width", (d) => d.size );
}

export const updateLink = (selection) => {

  selection.attr("x1", (d) => d.source.x)
    .attr("y1", (d) => d.source.y)
    .attr("x2", (d) => d.target.x)
    .attr("y2", (d) => d.target.y)

};

export const updateGraph = (selection) => {

  selection.selectAll('.node')
    .call(updateNode);
  selection.selectAll('.link')
    .call(updateLink);
}
