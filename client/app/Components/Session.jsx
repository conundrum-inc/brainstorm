import React from 'react';
import Menu from './Menu.jsx';
import * as d3 from 'd3'
import ReactDOM from 'react-dom'
import ReactModal from 'react-modal'

import { click, forceDiagram} from '../../d3/d3helpers.js'

import Graph from './Graph.jsx'
 

class Session extends React.Component {



  constructor(props) {

    super(props)

    this.state = {
      nodes: this.props.nodes,
      links: this.props.links
    }
  }

  componentDidMount() {
    
  }

  addNode() {
    const lastKey = nodes[nodes.length - 1].key;
    const lastLinkKey = links[links.length - 1].key
    nodes.push({key: lastKey+1, size: 10, x: 20, y: 20})
    links.push({source: nodes.length-1, target: 0, key: lastLinkKey+1, size: 2})
    this.setState({
      nodes,
      links
    })
  }

  render() {

    return (
      <div>
        <button onClick={this.addNode.bind(this)}>Add Node</button>
        <ReactModal
          isOpen={this.props.detailViewVisible}
          contentLabel="Detail Modal"
          shouldCloseOnOverlayClick={this.props.detailViewVisible}
        >
          <button onClick={this.props.hideDetail}>Close Modal</button>
        </ReactModal>
        <Graph nodes={this.state.nodes} links={this.state.links} showDetail={this.props.showDetail} /> 
      </div>
    )
  }
}

export default Session 

