import React from 'react';
import { Button, FormGroup, Form, Col, FormControl, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import Menu from './Menu.jsx';
import Session from './Session.jsx';
import InviteDetail from './InviteDetail.jsx'
import { hideInviteDetail } from '../actions/actionsCreators';
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
          <Button className="invite-button" onClick={ () => this.props.showInviteDetail() }>Invite!</Button>
        </div>
        <ReactModal isOpen={this.props.inviteDetailVisible}
          contentLabel="Invite Detail Modal"

          shouldCloseOnOverlayClick={true}
          onRequestClose={() => this.props.hideInviteDetail()}
          className="ReactModal__Content--after-open--invite"
          >
            <Button className="exit-btn" onClick={ () => this.props.hideInviteDetail() }>X</Button>
            <div className="invite-user-content">
              <h2>Add a friend to your session!</h2>
              <Form horizontal onSubmit={this.onSubmit.bind(this)}>
                  <InviteDetail />
              </Form>
            </div>
          </ReactModal>

          <Menu    showCreateSession={this.props.showCreateSession}
            hideCreateSession={this.props.hideCreateSession}
            createSessionVisible={this.props.createSessionVisible}
            currentNode={this.props.currentNode}
            setNode={this.props.setNode}
            updateNode={this.props.updateNode}
            addComment={this.props.addComment}
            thunkCreateSession={this.props.thunkCreateSession}
            showMenu={this.props.showMenu}
            hideMenu={this.props.hideMenu}
            menuVisible={this.props.menuVisible}
            clearComments={this.props.clearComments}
            user={this.props.user}
            hideDetail={this.props.hideDetail}
            thunkCreateSessionAndInvite={this.props.thunkCreateSessionAndInvite}
          />
          <Session showDetail={this.props.showDetail}
            hideDetail={this.props.hideDetail}
            detailViewVisible={this.props.detailViewVisible}
            comments={this.props.comments}
            nodes={this.props.nodes}
            links={this.props.links}
            addNode={this.props.addNode}
            addLink={this.props.addLink}
            detailViewVisible={this.props.detailViewVisible}
            user={this.props.user}
            thunkAddComment={this.props.thunkAddComment}
            addComment={this.props.addComment}
            thunkUpVote={this.props.thunkUpVote}
            thunkDownVote={this.props.thunkDownVote}
            editComment={this.props.editComment}
            setNode={this.props.setNode}
            currentNode={this.props.currentNode}
            showCreateSession={this.props.showCreateSession}
            session={this.props.session}
            updateComments={this.props.updateComments}
          />
      </div>
    )
  }

}

export default connect()(Main);

// {/* <Menu className="menu-button" menuVisible={props.menuVisible} onClick={() => props.menuVisible ? props.hideMenu() : props.showMenu()}/> */}
//

// class Login extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   componentDidMount() {
//     logout();
//   }
//   render() {
//    return (
//      <div>
//      <h2>Welcome to Brainstorm!</h2>
//      <a href="/auth/google">Sign In with Google</a>
//      </div>
//     )
//   }
// }
