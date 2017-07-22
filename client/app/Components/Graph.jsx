import React from 'react'
import * as d3 from 'd3'
import * as ReactDOM from 'react-dom'

import { connect } from 'react-redux'

import { width,
         height,
         force,
         enterNode,
         enterLink,
         updateNode,
         updateLink,
         updateGraph
       } from '../../d3/d3helpers.js'

import { commentsToNodes, wrapText } from '../utils.js'

var coords;

class Graph extends React.Component {

  componentDidMount() {

    coords = {};

    var nodes = commentsToNodes(this.props.comments);
    this.d3Graph = d3.select(ReactDOM.findDOMNode(this.refs.graph));
    force.on('tick', () => {
      // after force calculation starts, call updateGraph
      // which uses d3 to manipulate the attributes,
      // and React doesn't have to go through lifecycle on each tick
      this.d3Graph.call(updateGraph);
      coords = nodes.nodes.map(function(node) {
        return {'x': node.x,
                'y': node.y,
                'key': node.key }
      })
      // console.log('new coords: ', coords)

    })

    const d3Links = this.d3Graph.selectAll('.link')
      .data(nodes.links, (link) => link.key);
    d3Links.enter().insert('line', '.node').call(enterLink);

    const d3Nodes = this.d3Graph.selectAll('.node')
      .data(nodes.nodes, (node) => node.key);
    d3Nodes.enter().append('g').call(enterNode);

    //NOTE: we should clone the links and nodes that are passed down as props
    //since d3 mutates them. We'll do this later
    this.d3Graph.selectAll("circle")
      .on("click", node => {
        this.handleClick.bind(this, node)()
      })

    this.d3Graph.selectAll("text")
      .on("click", node => {
        this.handleClick.bind(this, node)()
      })

    // this.d3Graph.selectAll("text").each(wrapText)

    force.nodes(nodes.nodes).links(nodes.links);
    force.start();

    // console.log('nodes: ', nodes.nodes)
  }

  componentDidUpdate() {

    if (this.props.comments[0]._id === coords[0].key) {
      var nodes = commentsToNodes(this.props.comments, coords)
    } else {
      var nodes = commentsToNodes(this.props.comments)
    }

    force.on('tick', () => {
      // after force calculation starts, call updateGraph
      // which uses d3 to manipulate the attributes,
      // and React doesn't have to go through lifecycle on each tick
      this.d3Graph.call(updateGraph);
      coords = nodes.nodes.map(function(node) {
        return {'x': node.x,
                'y': node.y,
                'key': node.key }
      })
      // console.log('new coords: ', coords)

    })

    this.d3Graph = d3.select(ReactDOM.findDOMNode(this.refs.graph));

    this.d3Graph.selectAll("*").remove();

    const d3Links = this.d3Graph.selectAll('.link')
      .data(nodes.links, (link) => link.key);
    d3Links.enter().insert('line', '.node').call(enterLink);
    //d3Links.exit().remove();
    d3Links.call(updateLink);

    const d3Nodes = this.d3Graph.selectAll('.node')
      .data(nodes.nodes, (node) => node.key);
    d3Nodes.enter().append('g').call(enterNode);
    //d3Nodes.exit().remove()
    d3Nodes.call(updateNode);
    this.d3Graph.selectAll("circle")
      .on("click", node => {
        this.handleClick.bind(this, node)();
      })

    this.d3Graph.selectAll("text")
      .on("click", node => {
        this.handleClick.bind(this, node)();
      })


    //NOTE: we should clone the links and nodes that are passed down as props
    //since d3 mutates them. We'll do this later
    force.nodes(nodes.nodes).links(nodes.links);
    force.start();

  }

  handleClick(node) {
    console.log('clicked!')
    if (node.key === '101') {
      this.props.showCreateSession();
    } else {
      this.props.setNode(node);
      this.props.showDetail();
    }
  }

  render() {
    return (
        <svg  className="session-container" width="100%" height="100%">
          <g ref='graph' transform="translate(0,100)" width="100%" height="100%" />
        </svg>
      );
  }
}

export default connect()(Graph)
