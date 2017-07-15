import React from 'react';

class NodeDetail extends React.Component {

  addChild() {
    console.log('adding node')
    const nodes = this.props.nodes;
    const links = this.props.links;

    const lastKey = nodes[nodes.length - 1].key;
    const lastLinkKey = links[links.length-1] ? links[links.length - 1].key : 0

    const newNode = {key: lastKey+1, size:20, x: 20, y: 20}
    const newLink = {source: nodes.length, target: this.props.currentNode.index, key: lastLinkKey+1, size: 2}

    this.props.addNode(newNode)
    this.props.addLink(newLink)

  }

  upvote() {
    
    // let currentNode = this.props.currentNode
    // let newNode = { ...currentNode }
    // console.log("newNode size before: ", newNode.size)
    // newNode.size+=20
    // console.log("newNode size after: ", newNode.size)

    // this.props.updateNode(newNode)
    // this.props.setNode(newNode)

  }

  downvote() {
    // var newNode = {...this.props.currentNode };
    // newNode.size--;

    // this.props.updateNode(newNode);
  }

  render() {
    return (
      <div>
        <h2>Hi! I am node {this.props.currentNode.key}</h2>
        <p>This idea is literally the best idea ever. We should totally do this idea. You know what's awesome? This idea. Why? Because! Vote for Pedro!</p>
        <button className="add-comment" onClick={() => this.props.addComment('123', '345', '678', 'first comment', 'yassssss')}>Add Comment</button>
        <button className="upvote" onClick={this.upvote.bind(this)}>upvote</button>
        <button className="downvote" onClick={this.downvote.bind(this)}>downvote</button>
        <button onClick={this.addChild.bind(this)}>add node test</button>
        <h4>Node Child 1</h4>
        <h4>Node Child 2</h4>
        <h4>Node Child 3</h4>
        <form>
        <label>
          Title:
          <input type="text" name="title" />
        </label>
        <label>
          Description:
          <input type="text" name="text" />
        </label>
        <input type="submit" value="Add Comment" onClick={() => this.props.addComment('Jordan', '345', '678', 'first comment', 'yassssss')} />
        </form>
      </div>
    )
  }
}
export default NodeDetail;
