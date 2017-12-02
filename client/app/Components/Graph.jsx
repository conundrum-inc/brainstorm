
import React from 'react'
import * as d3 from 'd3'
import {event as currentEvent} from 'd3'
import * as ReactDOM from 'react-dom'

import { connect } from 'react-redux'

import { updateGraph,
         force,
         resize,
         startForce,
       } from '../../d3/d3helpers.js'

import { commentsToNodes } from '../utils.js'

var coords;

class Graph extends React.Component {

  
  componentDidMount() {
    coords = {};
    var nodes = commentsToNodes(this.props.comments);
    
    this.d3Graph = d3.select(ReactDOM.findDOMNode(this.refs.graph));
    this.forceLayout(this.d3Graph, nodes, false)
    d3.select(window).on("resize", () => resize(this.d3Graph))
  }

  componentDidUpdate() {
    if (this.props.comments[0]._id === coords[0].key) {
      var nodes = commentsToNodes(this.props.comments, coords)
    } else {
      var nodes = commentsToNodes(this.props.comments)
    }
    
    this.forceLayout(this.d3Graph, nodes, true)
  }

  handleClick(node) {
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

  giveClicks(selection) {
    selection.selectAll("circle")
      .on("click", node => {
        if (currentEvent.defaultPrevented) { return }
        this.handleClick.bind(this, node)()
      })
    
    selection.selectAll("text")
      .on("click", node => {
        if (currentEvent.defaultPrevented) { return }
        this.handleClick.bind(this, node)()
      })
  }

  forceLayout(selection, nodes, isUpdate) {
    startForce(nodes, selection, isUpdate)
    force.on('tick', () => this.tick(nodes, selection))
    this.giveClicks(selection)
  }

  render() {
    return (
        <svg ref='graph' 
             className="session-container"
             width={window.innerWidth}
             height={window.innerHeight}>
        </svg>
      );
  }
}

export default connect()(Graph)
