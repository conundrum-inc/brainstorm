import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
var ReactDOM = require('react-dom');
import { NavLink } from 'react-router-dom';
import { Button, DropdownButton, MenuItem, ButtonGroup } from 'react-bootstrap';
import CreateSessionDetail from './CreateSessionDetail.jsx';
import { thunkUpdateSession } from '../actions/actionsCreators';
import ReactModal from 'react-modal';
import { PROFILE_PAGE_ROUTE,
         LOGOUT_PAGE_ROUTE,
         SESSIONS_PAGE_ROUTE,
         MAIN_PAGE_ROUTE
       } from '../routes.js'

class Menu extends React.Component {

// const Menu = (props) => {
  // <a href={PROFILE_PAGE_ROUTE}><img src={props.user.image}/></a>

  handleClick(e) {
    // console.log(e.target.getAttribute('data-key'), this.props);
    this.props.thunkUpdateSession(e.target.getAttribute('data-key'));
    this.props.hideMenu();
  }

  render() {
    // console.log('props in Menu', this.props);
    return (
      <div>
        <ReactModal isOpen={this.props.menuVisible}
                    contentLabel="Menu Modal"
                    shouldCloseOnOverlayClick={this.props.menuVisible}
        >
          <Button onClick={this.props.hideMenu}>X</Button>
          <a href={PROFILE_PAGE_ROUTE}><img src={this.props.user.image} /></a>
          <a href={PROFILE_PAGE_ROUTE}><h3>{this.props.user.name}</h3></a>
          <h4>Sessions</h4>
          <div>
            {this.props.user.created_sessions.map((session) => {
              return <div key={session._id} data-key={session._id} className="session" onClick={this.handleClick.bind(this)}>{session.title} </div>
            })}
          </div>
          <Button bsStyle="info"
            className="add-comment"
            onClick={() => { this.props.showCreateSession(); this.props.hideMenu(); }}>
            New Session!
          </Button>
          <Button bsStyle="info" href={LOGOUT_PAGE_ROUTE}>
            <NavLink to={LOGOUT_PAGE_ROUTE}></NavLink>
            Logout
          </Button>
        </ReactModal>

        <ReactModal isOpen={this.props.createSessionVisible}
          contentLabel="Detail Modal"
          shouldCloseOnOverlayClick={this.props.createSessionVisible}
          >
            <Button onClick={this.props.hideCreateSession}>X</Button>
            <CreateSessionDetail
              addComment={this.props.addComment}
              currentNode={this.props.currentNode}
              setNode={this.props.setNode}
              updateNode={this.props.updateNode}
              thunkCreateSession={this.props.thunkCreateSession}
              clearComments={this.props.clearComments}
              user={this.props.user}
              hideCreateSession={this.props.hideCreateSession}
            />
          </ReactModal>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ thunkUpdateSession }, dispatch);
}

export default connect(null, mapDispatchToProps)(Menu)

/* <ButtonGroup>
  <Button bsStyle="info" href={PROFILE_PAGE_ROUTE}>
    <NavLink to={PROFILE_PAGE_ROUTE}></NavLink>
    My Profile
  </Button>
  <Button bsStyle="info" className="add-comment" onClick={() => props.showCreateSession()}>New Session!</Button>
  <Button bsStyle="info" href={LOGOUT_PAGE_ROUTE}>
    <NavLink to={LOGOUT_PAGE_ROUTE}></NavLink>
    Logout
  </Button>
</ButtonGroup>
<ReactModal isOpen={props.createSessionVisible}
  contentLabel="Detail Modal"
  shouldCloseOnOverlayClick={props.createSessionVisible}
  >
    <Button onClick={props.hideCreateSession}>X</Button>
    <CreateSessionDetail
      addComment={props.addComment}
      currentNode={props.currentNode}
      setNode={props.setNode}
      updateNode={props.updateNode}
      thunkCreateSession={props.thunkCreateSession}
    />
  </ReactModal> */
