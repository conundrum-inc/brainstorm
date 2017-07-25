import React from 'react';
import PropTypes from 'prop-types';
// import Helmet from 'react-helmet';
import { withRouter } from 'react-router';
import { Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionsCreators';
import Profile from '../Profile.jsx';
import MySessions from '../MySessions.jsx';
import Menu from '../Menu.jsx';
import { NavLink } from 'react-router-dom';
import { LOGOUT_PAGE_ROUTE } from '../../routes.js';


const ProfilePage = (props) => {
  console.log('ProfilePage props: ', props);
  return (
    <div>
      <div className="menu-bar">
        <h1 id="title"><a id="title" href='/main'>BrainStorm</a></h1>
      </div>
      <div className="profile-info">
        <Profile
          history={props.history}
          user={props.user}
          addComment={props.addComment}
          currentNode={props.currentNode}
          setNode={props.setNode}
          updateNode={props.updateNode}
          thunkCreateSession={props.thunkCreateSession}
          clearComments={props.clearComments}
          showCreateSession={props.showCreateSession}
          hideCreateSession={props.hideCreateSession}
          thunkCreateSessionAndInvite={props.thunkCreateSessionAndInvite}
        />
        <MySessions user={props.user}/>
        <div className="profile-btn-logout">
          <Button href={LOGOUT_PAGE_ROUTE}>
            <NavLink to={LOGOUT_PAGE_ROUTE}></NavLink>
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    user: state.user,
    comments: state.comments,
    createSessionVisible: state.createSessionVisible,
    detailViewVisible: state.detailViewVisible,
    inviteDetailVisible: state.inviteDetailVisible,
    menuVisible: state.menuVisible,
    nodes: state.nodes,
    links: state.links,
    currentNode: state.currentNode,
    setNode: state.setNode,
    updateNode: state.updateNode,
    session: state.session,
    thunkCreateSession: state.thunkCreateSession,
    thunkCreateSessionAndInvite: state.thunkCreateSessionAndInvite,
    thunkUpdateSession: state.thunkUpdateSession,
    addComment: state.addComment,
    showCreateSession: state.showCreateSession,
    hideCreateSession: state.hideCreateSession
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

ProfilePage.propTypes = {
  history: PropTypes.object.isRequired
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage));
