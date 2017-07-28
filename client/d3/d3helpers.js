import * as d3 from 'd3'
import { showDetail } from '../app/actions/actionsCreators.js'
import { randomBlue } from '../app/utils.js'



const width = window.innerWidth;
const height = window.innerHeight - (.3)*(window.innerHeight);
export const force = d3.layout.force()
            .linkDistance(110)
            .charge(-1000)
            .size([width, height])



const enterNode = (selection) => {

  selection.classed('node', true);

  const tooltip = d3.select("body").append("div")
    .attr("class", "mytooltip")

  selection.append('circle')
    .attr("r", (d) => d.size)
    .attr("fill", randomBlue)
    .attr("class", "circle")
    .on("mouseover", function(d) {
      if (d.text === "") {
        return
      }
      tooltip.text(d.text)
            .transition()
            .duration(500)
            .style("opacity","1")     
    })
    .on("mousemove", function(d){
      if (d.text === "") {
        return
      }
      tooltip.text(d.text)
             .style("top", (event.pageY-10)+"px")
             .style("left",(event.pageX+20)+"px")            
    })
    // .on("mouseout", function(){
    //   tooltip.transition()
    //          .duration(500)
    //          .style("opacity", "0");
    // })


  selection.append('text')
    .attr("x", (d) => d.cx)
    .style("fill", "#373a3a")
    .attr("text-anchor", "middle")
    .style("font-weight", "bold")
    // .style("text-transform", "uppercase")
    .style("font-size", (d) => (d.size + 50) / 6 + "px")
    .attr("dy", ".35em")
    .text((d) => d.title)
    .on("mouseover", function(d) {
      if (d.text === "") {
        return
      }
      tooltip.text(d.text)
            .transition()
            .duration(500)
            .style("opacity","1")     
    })
    .on("mousemove", function(d){
      if (d.text === "") {
        return
      }
      tooltip.text(d.text)
             .style("top", (event.pageY-10)+"px")
             .style("left",(event.pageX+20)+"px")            
    })
    .on("mouseout", function(){
      tooltip.transition()
             .duration(500)
             .style("opacity", "0");
    })

}

const updateNode = (selection) => {

  selection.attr("transform", (d) => "translate(" + d.x + "," + d.y + ")").call(force.drag)

}

const enterLink = (selection) => {

  selection.classed('link', true)
    .attr("stroke", "#cccccc")
    .attr("stroke-opacity", ".6;")
    .attr("stroke-width", (d) => d.size );
}

const updateLink = (selection) => {

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

const createNodesAndLinks = (nodes, selection) => {
  const d3Links = selection.selectAll('.link')
      .data(nodes.links, (link) => link.key);
    d3Links.enter().insert('line', '.node').call(enterLink);
    d3Links.call(updateLink);

    const d3Nodes = selection.selectAll('.node')
      .data(nodes.nodes, (node) => node.key);
    d3Nodes.enter().append('g').call(enterNode);
    d3Nodes.call(updateNode);
}

export const resize = (selection) => {
  var width = window.innerWidth
  var forceHeight = window.innerHeight - .3*window.innerHeight;
  var svgHeight = window.innerHeight
  selection.attr("width", width).attr("height", svgHeight);
  force.size([width, forceHeight]).resume();
}

export const startForce = (nodes, selection, restart) => {

    if (restart) {
      selection.selectAll("*").remove();
      d3.select("body").selectAll(".mytooltip").remove();
    }

    createNodesAndLinks(nodes, selection)
    force.nodes(nodes.nodes).links(nodes.links);
    force.start();

}



