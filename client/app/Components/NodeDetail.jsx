import React from 'react';

class NodeDetail extends React.Component {

  addNode() {
    console.log('adding node')
    const nodes = this.props.nodes;
    const links = this.props.links;

    const lastKey = nodes[nodes.length - 1].key;
    const lastLinkKey = links[links.length-1] ? links[links.length - 1].key : 0

    const newNode = {key: lastKey+1, size:10, x: 20, y: 20}
    const newLink = {source: nodes.length, target: this.props.currentNode.index, key: lastLinkKey+1, size: 2}
    
    this.props.addNode(newNode)
    this.props.addLink(newLink)

  }

  render() {
    return (
      <div>
        <h2>Hi! I am node {this.props.currentNode.key}</h2>
        <p>This idea is literally the best idea ever. We should totally do this idea. You know what's awesome? This idea. Why? Because! Vote for Pedro!</p>
        <button className="add-comment" onClick={() => this.props.addComment('123', '345', '678', 'first comment', 'yassssss')}>Add Comment</button>
        <button>upvote</button>
        <button>downvote</button>
        <button onClick={this.addNode.bind(this)}>add node test</button>
        <h4>Node Child 1</h4>
        <h4>Node Child 2</h4>
        <h4>Node Child 3</h4>
      </div>
    )
  }
}

export default NodeDetail;
