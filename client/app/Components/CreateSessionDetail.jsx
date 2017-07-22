import React from 'react';
import { Button, FormGroup, Form, Col, FormControl, ControlLabel } from 'react-bootstrap';
import InviteDetail from './InviteDetail.jsx';
import { hideInviteDetail } from '../actions/actionsCreators';
import { buildEmailArray } from '../helpers.js'
import { inviteUsers } from '../axiosCalls'


class NodeDetail extends React.Component {

  onSubmit(e, props) {
    e.preventDefault();
    this.props.clearComments();
    var array = buildEmailArray(e.target.emails.value);
    this.props.thunkCreateSessionAndInvite(e.target.title.value, e.target.text.value, this.props.user.userId, array);
    // console.log('emails array: ', array);
    // console.log('sessionId: ', this.props.session.sessionId);
    // inviteUsers(array, this.props.session.sessionId);
    this.props.hideCreateSession();
  }

  render() {
    return (
      <div className="new-session-modal-content">
        <h2>Start a Sesh</h2>
        <Form horizontal onSubmit={this.onSubmit.bind(this)}>
          <FormGroup controlId="commentTitle">
            <Col componentClass={ControlLabel} sm={2}>
              Session Title:
            </Col>
            <Col sm={10}>
              <FormControl name="title" type="title" placeholder="What are you brainstorming for?" />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Description:
            </Col>
            <Col sm={10}>
              <FormControl name="text" type="details" placeholder="This is your brainstorm starting point! Details, criteria, suggestions go here for collaborators to check out. " />
            </Col>
          </FormGroup>
          <InviteDetail />
        </Form>
      </div>
    )
  }
}
export default NodeDetail;
