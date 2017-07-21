import * as d3 from 'd3'
import { showDetail } from '../app/actions/actionsCreators.js'

import { wrapText } from '../app/utils.js'

export const width = 960;
export const height = 500;
export const force = d3.layout.force()
            .charge(-500)
            .linkDistance(85)
            .size([width, height]);


export const enterNode = (selection) => {

  selection.classed('node', true);

  selection.append('circle')
    .attr("r", (d) => d.size)
    .attr("fill", "white")
    .attr("stroke", "black")
    .call(force.drag)

  selection.append('text')
    .attr("x", (d) => d.cx)
    .attr("text-anchor", "middle")
    .attr("dy", ".35em")
    .text((d) => d.title)

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
