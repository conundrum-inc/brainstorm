import React from 'react';
import ReactModal from 'react-modal';
import { Button, FormGroup, Form, Col, FormControl, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Menu from './Menu.jsx';
import Session from './Session.jsx';
import InviteDetail from './InviteDetail.jsx'

import * as actionCreators from '../actions/actionsCreators';
import { buildEmailArray } from '../helpers.js'
import { inviteUsers } from '../axiosCalls'

import { LOGOUT_PAGE_ROUTE } from '../routes.js';


class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.thunkAddUser();
  }

  componentDidMount() {
    console.log('props in Main', this.props)
  }

  onSubmit(e, props) {
    e.preventDefault();
    var array = buildEmailArray(e.target.emails.value);
    inviteUsers(array, this.props.session.sessionId);
    this.props.hideInviteDetail();
  }

  render() {
    return (
      <div>
        <div className="menu-bar">
          <img className="menu-button"src="http://i.imgur.com/NErSVt4.png"
            onClick={() => this.props.showMenu()}
            width="30px"
            height="30px"
          />
          <h1 id="title"><a id="title" href='/main'>BrainStorm</a></h1>
        </div>
        <ReactModal isOpen={this.props.inviteDetailVisible}
          contentLabel="Invite Detail Modal"
          shouldCloseOnOverlayClick={true}
          onRequestClose={() => this.props.hideInviteDetail()}
          className="ReactModal__Content--after-open--invite"
          >
          <Button className="exit-btn" onClick={ () => this.props.hideInviteDetail() }>X</Button>
          <div className="invite-user-content">
            <h4>Add friends to this session!</h4>
            <Form horizontal onSubmit={this.onSubmit.bind(this)}>
                <InviteDetail />
            </Form>
          </div>
        </ReactModal>

        <Menu/>
        <Button title="Invite people to join this session" className="invite-button" onClick={ () => this.props.showInviteDetail() }>Invite!</Button>

        <Session />
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    inviteDetailVisible: state.inviteDetailVisible
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
