import React from 'react';
import emoji from 'node-emoji';
import { Button, FormGroup, Form, Col, FormControl, ControlLabel } from 'react-bootstrap';
import io from "socket.io-client";
var socket = io();

class NodeDetail extends React.Component {

  onSubmit(e, props) {
    e.preventDefault();
    console.log('SESSION', this.props.session.sessionId)
    this.props.thunkAddComment(this.props.user.userId, this.props.currentNode.key, this.props.session.sessionId, e.target.title.value, e.target.text.value);
    this.props.hideDetail();
  }

  // LINK TO EMOJI CHEAT SHEET: https://www.webpagefx.com/tools/emoji-cheat-sheet/

  upvote() {
    console.log('commentId: ', this.props.currentNode.key)
    this.props.thunkUpVote(this.props.user.userId, this.props.currentNode.key)

  }

  downvote() {
    this.props.thunkDownVote(this.props.user.userId, this.props.currentNode.key)
  }

  // newComment(){
  //   socket.emit('new comment', ())
  // }

  render() {
    return (
      <div>
        <h2>{this.props.currentNode.title}</h2>
        <p>{this.props.currentNode.text}</p>
        <Button className="upvote" onClick={this.upvote.bind(this)}>{emoji.emojify(':+1:')}</Button>
        <Button className="downvote" onClick={this.downvote.bind(this)}>{emoji.emojify(':thumbsdown:')}</Button>
        <h3>Children</h3>
        {(this.props.currentNode.children).map(function(child) {
          return <h4 key={child}>{child}</h4>
        })}
        <h2>Add a comment:</h2>
        <Form horizontal onSubmit={this.onSubmit.bind(this)}>
          <FormGroup controlId="commentTitle" >
            <Col componentClass={ControlLabel} sm={2}>
              Title:
            </Col>
            <Col sm={10}>
              <FormControl type="title" name="title" placeholder="Title" maxLength="20"/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Details:
            </Col>
            <Col sm={10}>
              <FormControl type="details" name="text" placeholder="Elaborate here!" />
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
