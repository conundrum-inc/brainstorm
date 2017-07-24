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

const ProfilePage = (props) => {
  console.log('ProfilePage props: ', props);
  return (
    <div>
      <div className="menu-bar">
        <img className="menu-button"src="http://i.imgur.com/NErSVt4.png"
          onClick={() => props.showMenu()}
          width="30px"
          height="30px"
        />
        <h1 id="title"><a id="title" href='/main'>BrainStorm</a></h1>
      </div>
      <Menu showCreateSession={props.showCreateSession}
            hideCreateSession={props.hideCreateSession}
            createSessionVisible={props.createSessionVisible}
            currentNode={props.currentNode}
            setNode={props.setNode}
            updateNode={props.updateNode}
            addComment={props.addComment}
            thunkCreateSession={props.thunkCreateSession}
            showMenu={props.showMenu}
            hideMenu={props.hideMenu}
            menuVisible={props.menuVisible}
            clearComments={props.clearComments}
            user={props.user}
            hideDetail={props.hideDetail}
      />
      <div className="profile-info">
        <Profile history={props.history} user={props.user}/>
        <MySessions user={props.user}/>
      </div>
    </div>
    )
  }

function mapStateToProps(state) {
  return {
    comments: state.comments,
    createSessionVisible: state.createSessionVisible,
    detailViewVisible: state.detailViewVisible,
    inviteDetailVisible: state.inviteDetailVisible,
    menuVisible: state.menuVisible,
    nodes: state.nodes,
    links: state.links,
    currentNode: state.currentNode,
    user: state.user,
    session: state.session
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
