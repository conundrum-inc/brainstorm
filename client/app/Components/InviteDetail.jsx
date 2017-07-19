import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hideInviteDetail } from '../actions/actionsCreators';

import { Button, FormGroup, Form, Col, FormControl, ControlLabel } from 'react-bootstrap';


class InviteDetail extends React.Component {

  onSubmit(e, props) {
    e.preventDefault();
    this.props.hideInviteDetail();
  }

  render() {
    console.log('props in inviteDetail', this.props)
    return (
      <div>
        <h2>Add a friend to your session!</h2>
        <Form horizontal onSubmit={this.onSubmit.bind(this)}>

          <FormGroup controlId="inviteEmails">
            <Col componentClass={ControlLabel} sm={2}>
              Email(s):
            </Col>
            <Col sm={10}>
              <FormControl name="emails" type="emails" placeholder="Enter emails separated by commas." />
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

function mapStateToProps(state) {
  return {
    session: state.session,
    inviteDetailVisible: state.detailViewVisible
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ hideInviteDetail }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InviteDetail);
