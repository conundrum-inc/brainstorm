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

    //if there is a session on the persisted state, subscribe the client to that room
    if (this.props.session) {
      socket.emit('join session', this.props.session.sessionId)
    }

    //when a session invitation event is detected
    socket.on('new session', function(session) {
      //add the new session id to the state
      console.log('new invite')
      this.props.addSession(session)
    }.bind(this))
  }

  componentWillMount() {
    this.props.thunkAddUser();
  }

  onSubmit(e, props) {
    e.preventDefault();
    var array = buildEmailArray(e.target.emails.value);
    inviteUsers(array, this.props.session.sessionId);
    //emit the invite users event to the server
    var new_session = {
      _id: this.props.session.sessionId,
      title: this.props.session.title
    }
    socket.emit('invite users', array, new_session)
    this.props.hideInviteDetail();
  }

  render() {
    return (
      <div>
        <div className="menu-bar">
          <img className="menu-button" src="http://i.imgur.com/NErSVt4.png"
            onClick={() => this.props.showMenu()}
            width="30px"
            height="30px"
          />
          <h1 id="title"><a id="title" href='/main'>brainstorm</a></h1>
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
    session: state.session,
    inviteDetailVisible: state.inviteDetailVisible,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
