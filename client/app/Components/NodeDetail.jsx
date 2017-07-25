import React from 'react';
import emoji from 'node-emoji';
import { Button, FormGroup, Form, Col, FormControl, ControlLabel } from 'react-bootstrap';
import io from "socket.io-client";
var socket = io();

class NodeDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit(e, props) {
    e.preventDefault();
    // console.log('SESSION', this.props.session.sessionId)
    this.props.thunkAddComment(this.props.user.userId, this.props.currentNode.key, this.props.session.sessionId, e.target.title.value, e.target.text.value);
    this.props.hideDetail();
  }

  handleClick(e, props) {
    // console.log(e.target.getAttribute('data-key'), this.props);
    // console.log('in NodeDetail handleClick comment id: ', e.target.getAttribute('data-key'))
    this.props.thunkUpdateCurrentNode(e.target.getAttribute('data-key'));
  }

  // LINK TO EMOJI CHEAT SHEET: https://www.webpagefx.com/tools/emoji-cheat-sheet/

  upvote() {
    console.log('commentId: ', this.props.currentNode.key)
    this.props.thunkUpVote(this.props.user.userId, this.props.currentNode.key)

  }

  downvote() {
    this.props.thunkDownVote(this.props.user.userId, this.props.currentNode.key)
  }

  render() {
    return (
      <div className="new-comment-modal-content">
        <h4 className="node-title">Idea: "{this.props.currentNode.title}"</h4>
        <h5 className="thought-detail">Detail:</h5>
        <p className="node-text">{this.props.currentNode.text}</p>
        <Button className="upvote" onClick={this.upvote.bind(this)}>{emoji.emojify(':+1:')}</Button>
        <Button className="downvote" onClick={this.downvote.bind(this)}>{emoji.emojify(':thumbsdown:')}</Button>
        <h5 className="branches-headings" >Branches</h5>

        {this.props.currentNode.children.map((child) => {
          return <div className="child-title" data-key={child._id} key={child._id} onClick={this.handleClick.bind(this)}>{child.title}</div>
        })}

        {/* {this.props.user.accessible_sessions.map((comment) => {
          return <div key={comment._id} data-key={comment._id} className="session-title" onClick={this.handleClick.bind(this)}>{comment.title} </div>
        })} */}

        <h5 className="branches-headings" >Add a branch to "{this.props.currentNode.title}":</h5>
        <Form horizontal onSubmit={this.onSubmit.bind(this)}>
          <FormGroup controlId="commentTitle" >
            {/* <Col componentClass={ControlLabel} sm={2}>
              Title:
            </Col> */}
            <Col sm={10}>
              <FormControl className="node-detail-form" autoFocus="autofocus" type="title" name="title" placeholder="Title" maxLength="15"/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword">
            {/* <Col componentClass={ControlLabel} sm={2}>
              Details:
            </Col> */}
            <Col sm={10}>
              <FormControl className="node-detail-form" type="details" name="text" placeholder="Elaborate here!" />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={10}>
              <Button className="submit-btn" type="submit">
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
