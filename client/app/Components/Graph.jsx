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
         updateGraph,
         createNodesAndLinks
       } from '../../d3/d3helpers.js'

import { commentsToNodes } from '../utils.js'

var coords;

class Graph extends React.Component {

  componentDidMount() {

    coords = {};

    var nodes = commentsToNodes(this.props.comments);
    this.d3Graph = d3.select(ReactDOM.findDOMNode(this.refs.graph));
    force.on('tick', () => this.tick(nodes, this.d3Graph))

    createNodesAndLinks(nodes, this.d3Graph);

    //NOTE: we should clone the links and nodes that are passed down as props
    //since d3 mutates them. We'll do this later
    this.d3Graph.selectAll("circle")
      .on("dblclick", node => {
        this.handleClick.bind(this, node)()
      })

    this.d3Graph.selectAll("text")
      .on("dblclick", node => {
        this.handleClick.bind(this, node)()
      })


    d3.select(window).on("resize", resize.bind(this))

    force.nodes(nodes.nodes).links(nodes.links);
    force.start();

    function resize() {

      var width = window.innerWidth
      var forceHeight = window.innerHeight - .3*window.innerHeight;
      var svgHeight = window.innerHeight
      this.d3Graph.attr("width", width).attr("height", svgHeight);
      force.size([width, forceHeight]).resume();
    }



  }

  componentDidUpdate() {

    if (this.props.comments[0]._id === coords[0].key) {
      var nodes = commentsToNodes(this.props.comments, coords)
    } else {
      var nodes = commentsToNodes(this.props.comments)
    }

    force.on('tick', () => this.tick(nodes, this.d3Graph))

    this.d3Graph = d3.select(ReactDOM.findDOMNode(this.refs.graph));

    this.d3Graph.selectAll("*").remove();

    createNodesAndLinks(nodes, this.d3Graph)

    this.d3Graph.selectAll("circle")
      .on("dblclick", node => {
        this.handleClick.bind(this, node)();
      })

    this.d3Graph.selectAll("text")
      .on("dblclick", node => {
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

  tick(nodes, selection) {
    selection.call(updateGraph);
    coords = nodes.nodes.map(function(node) {
      return {'x': node.x,
              'y': node.y,
              'key': node.key }
    })
  }

  render() {
    return (
        <svg ref='graph' className="session-container" width={window.innerWidth} height={window.innerHeight}>

        </svg>
      );
  }
}

export default connect()(Graph)
