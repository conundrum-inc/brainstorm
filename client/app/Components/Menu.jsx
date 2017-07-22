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
                    shouldCloseOnOverlayClick={true}
                    onRequestClose={() => this.props.hideMenu()}
                    className="ReactModal__Content--after-open--menu"
        >
          <Button className="exit-btn" onClick={this.props.hideMenu}>X</Button>
          <a className="user-picture-container" href={PROFILE_PAGE_ROUTE}><img className="user-picture" src={this.props.user.image} /></a>
          <a href={PROFILE_PAGE_ROUTE}><h3 className="user-name">{this.props.user.name}</h3></a>
          <div className="menu-modal-content">
            <h4>Sessions</h4>
            <div>
              {this.props.user.accessible_sessions.map((comment) => {
                return <div key={comment._id} data-key={comment._id} className="session-title" onClick={this.handleClick.bind(this)}>{comment.title} </div>
              })}
            </div>
            <Button bsStyle="info"
              className="menu-btn-new-session"
              onClick={() => { this.props.showCreateSession(); this.props.hideMenu(); }}>
              New Session!
            </Button>
            <Button className="menu-btn-logout" bsStyle="info" href={LOGOUT_PAGE_ROUTE}>
              <NavLink to={LOGOUT_PAGE_ROUTE}></NavLink>
              Logout
            </Button>
          </div>
        </ReactModal>

        <ReactModal isOpen={this.props.createSessionVisible}
          contentLabel="Detail Modal"
          shouldCloseOnOverlayClick={this.props.createSessionVisible}
          className="ReactModal__Content--after-open--new-session"
          >
            <Button className="exit-btn" onClick={this.props.hideCreateSession}>X</Button>
            <CreateSessionDetail
              addComment={this.props.addComment}
              currentNode={this.props.currentNode}
              setNode={this.props.setNode}
              updateNode={this.props.updateNode}
              thunkCreateSession={this.props.thunkCreateSession}
              clearComments={this.props.clearComments}
              user={this.props.user}
              hideCreateSession={this.props.hideCreateSession}
              thunkCreateSessionAndInvite={this.props.thunkCreateSessionAndInvite}
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
