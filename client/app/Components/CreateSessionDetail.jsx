import React from 'react';
import { Button, FormGroup, Form, Col, FormControl, ControlLabel } from 'react-bootstrap';

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
        <h2>Start a Sesh</h2>
        <Form horizontal>
          <FormGroup controlId="commentTitle">
            <Col componentClass={ControlLabel} sm={2}>
              Session Title:
            </Col>
            <Col sm={10}>
              <FormControl type="title" placeholder="What are you brainstorming for?" />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Description:
            </Col>
            <Col sm={10}>
              <FormControl type="details" placeholder="This is your brainstorm starting point! Details, criteria, suggestions go here for collaborators to check out. " />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">
                Submit
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}
export default NodeDetail;
