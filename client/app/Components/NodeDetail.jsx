import React from 'react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionsCreators';

import emoji from 'node-emoji';
import { Button, FormGroup, Form, Col, FormControl, ControlLabel } from 'react-bootstrap';
import { oneCommentToNode, findIndex } from '../utils.js'

class NodeDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit(e, props) {
    e.preventDefault();
    this.props.thunkAddComment(this.props.user.userId, this.props.currentNode.key, this.props.session.sessionId, e.target.title.value, e.target.text.value);
    this.props.hideDetail();
  }

  handleClick(e, props) {
    console.log(findIndex)
    //look up comment on state that matches what we clicked
    var index = findIndex(this.props.comments, "_id", e.target.getAttribute('data-key'));
    //make a new node from this comment
    var node = oneCommentToNode(this.props.comments[index])
    //call setNode action creator
    this.props.setNode(node);
    // this.props.thunkUpdateCurrentNode(e.target.getAttribute('data-key'));
  }

  handleEditClick(e, props) {
    console.log('in handleEditClick');
    this.props.hideDetail();
    this.props.showEditCommentDetail();
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
    console.log('userId: ', this.props.user.userId, 'currentNodeCreatorId: ', this.props.currentNode.creatorId, 'currentNodeParentId: ', this.props.currentNode.parentId)
    if (this.props.user.userId === this.props.currentNode.creatorId && this.props.currentNode.parentId !== 'root') {
      var editButton =  <Button className="edit-comment-btn" onClick={this.handleEditClick.bind(this)} >Edit</Button>
    }
    return (
      <div className="new-comment-modal-content">
        <h4 className="node-title">Idea: "{this.props.currentNode.title}"</h4>
        {editButton}
        <h5 className="thought-detail">Detail:</h5>
        <p className="node-text">{this.props.currentNode.text}</p>
        <Button className="upvote" onClick={this.upvote.bind(this)}>{emoji.emojify(':+1:')}</Button>
        <Button className="downvote" onClick={this.downvote.bind(this)}>{emoji.emojify(':thumbsdown:')}</Button>
        <h5 className="branches-headings" >Branches</h5>

        {this.props.currentNode.children.map((child) => {
          return <div className="child-title" data-key={child._id} key={child._id} onClick={this.handleClick.bind(this)}>{child.title}</div>
        })}

        <h5 className="branches-headings" >Add a topic to "{this.props.currentNode.title}":</h5>
        <Form horizontal onSubmit={this.onSubmit.bind(this)}>
          <FormGroup controlId="commentTitle" >
            <Col sm={10}>
              <FormControl className="node-detail-form" autoFocus="autofocus" type="title" name="title" placeholder="Title" maxLength="15"/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword">
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

function mapStateToProps(state) {
  return {
    currentNode: state.currentNode,
    user: state.user,
    session: state.session,
    comments: state.comments
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NodeDetail);
