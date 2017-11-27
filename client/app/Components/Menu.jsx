import React from 'react';
var ReactDOM = require('react-dom');
import { NavLink } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CreateSessionDetail from './CreateSessionDetail.jsx';
import * as actionCreators from '../actions/actionsCreators';

import { Button, DropdownButton, MenuItem, ButtonGroup } from 'react-bootstrap';
import ReactModal from 'react-modal';

import { PROFILE_PAGE_ROUTE,
         LOGOUT_PAGE_ROUTE,
         SESSIONS_PAGE_ROUTE,
         MAIN_PAGE_ROUTE
       } from '../routes.js';

import io from "socket.io-client";
// var socket = io();

const Menu = (props) => {

  const handleClick = (e) => {
    
    console.log('client heading to session: ', e.target.getAttribute('data-key'))
    if (props.session !== null) {
      props.thunkUpdateSession(e.target.getAttribute('data-key'), props.session.sessionId);
    } else {
      props.thunkUpdateSession(e.target.getAttribute('data-key'));
    }
    props.hideMenu();
  }

  return (
    <div>
      <ReactModal isOpen={props.menuVisible}
                  contentLabel="Menu Modal"
                  shouldCloseOnOverlayClick={true}
                  onRequestClose={() => props.hideMenu()}
                  className="ReactModal__Content--after-open--menu"
      >
        <Button className="exit-btn" onClick={props.hideMenu}>X</Button>
        <a className="user-picture-container" href={PROFILE_PAGE_ROUTE}>
          <img className="user-picture" src={props.user.image} />
        </a>
        <a href={PROFILE_PAGE_ROUTE}><h3 className="user-name">{props.user.name}</h3></a>
        <div className="menu-modal-content">
          <h4>Sessions</h4>
          <ul>
            {props.user.accessible_sessions.map((session) => {
              return <div key={session._id}
                data-key={session._id}
                className="session-title"
                onClick={handleClick}>
                <li data-key={session._id}>{session.title}</li>
              </div>
            })}
          </ul>
          <Button bsStyle="info"
            className="menu-btn-new-session"
            onClick={() => { props.showCreateSession(); props.hideMenu(); }}>
            New Session!
          </Button>
          <Button className="menu-btn-logout" bsStyle="info" href={LOGOUT_PAGE_ROUTE}>
            <NavLink to={LOGOUT_PAGE_ROUTE}></NavLink>
            Logout
          </Button>

        </div>

      </ReactModal>

      <ReactModal
        isOpen={props.createSessionVisible}
        contentLabel="Detail Modal"
        shouldCloseOnOverlayClick={true}
        onRequestClose={props.hideCreateSession}
        className="ReactModal__Content--after-open--new-session"
      >
          <Button className="exit-btn" onClick={props.hideCreateSession}>X</Button>

          <CreateSessionDetail />
        </ReactModal>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    user: state.user,
    session: state.session,
    menuVisible: state.menuVisible,
    createSessionVisible: state.createSessionVisible
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
