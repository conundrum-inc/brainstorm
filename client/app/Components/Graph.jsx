import React from 'react'
import * as d3 from 'd3'
import * as ReactDOM from 'react-dom'

import { width,
         height,
         force,
         enterNode,
         enterLink,
         updateNode,
         updateLink,
         updateGraph
       } from '../../d3/d3helpers.js'

class Graph extends React.Component {

  componentDidMount() {
    this.d3Graph = d3.select(ReactDOM.findDOMNode(this.refs.graph));
    force.on('tick', () => {
      // after force calculation starts, call updateGraph
      // which uses d3 to manipulate the attributes,
      // and React doesn't have to go through lifecycle on each tick
      this.d3Graph.call(updateGraph);
    })

    const d3Links = this.d3Graph.selectAll('.link')
      .data(this.props.links, (link) => link.key);
    d3Links.enter().insert('line', '.node').call(enterLink);
    d3Links.exit().remove();
    d3Links.call(updateLink);
    
    const d3Nodes = this.d3Graph.selectAll('.node')
      .data(this.props.nodes, (node) => node.key);
    d3Nodes.enter().append('g').call(enterNode);
    d3Nodes.exit().remove()
    d3Links.call(updateLink);


    //NOTE: we should clone the links and nodes that are passed down as props
    //since d3 mutates them. We'll do this later
    force.nodes(this.props.nodes).links(this.props.links);
    force.start();
  }

  shouldComponentUpdate(nextProps) {
    this.d3Graph = d3.select(ReactDOM.findDOMNode(this.refs.graph));

    const d3Nodes = this.d3Graph.selectAll('.node')
      .data(nextProps.nodes, (node) => node.key);
    d3Nodes.enter().append('g').call(enterNode);
    d3Nodes.exit().remove()
    d3Links.call(updateLink);

    //NOTE: we should clone the links and nodes that are passed down as props
    //since d3 mutates them. We'll do this later
    force.nodes(nextProps.nodes).links(nextProps.links);
    force.start();

    return false;
  }

  render() {
    return (
        <svg width={width} height={height}>
          <g ref='graph' />
        </svg>
      );
  }
}

export default Graph