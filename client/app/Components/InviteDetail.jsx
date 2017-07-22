import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hideInviteDetail } from '../actions/actionsCreators';
import { buildEmailArray } from '../helpers.js'
import { inviteUsers } from '../axiosCalls'

import { Button, FormGroup, Form, Col, FormControl, ControlLabel } from 'react-bootstrap';


class InviteDetail extends React.Component {

  render() {
    return (
      <div>
        <FormGroup className="form-horizontal form-group" controlId="inviteEmails">
          <Col componentClass={ControlLabel} sm={2}>
            Email(s):
          </Col>
          <Col sm={10}>
            <FormControl name="emails" type="emails" placeholder="Enter emails separated by commas." />
          </Col>
        </FormGroup>

        <FormGroup className="form-horizontal form-group">
          <Col smOffset={2} sm={10}>
            <Button type="submit">
              Submit
            </Button>
          </Col>
        </FormGroup>
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
