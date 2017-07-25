import React from 'react';
import { ReactModal } from 'react-modal';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import CreateSessionDetail from './CreateSessionDetail.jsx';


const Profile = (props) => {
  console.log('Profile props: ', props);
  var first = props.user.name.split(' ')[0];
  var username = props.user.email;
  console.log(first);
  return (
    <div className="profile-text">
      <h3>Your profile:</h3>
      <img src={props.user.image}></img>
      <p className="account-name">{props.user.name}</p>
      <p className="email">{username}</p>
      <Button
        className="profile-btn-new-session"
        onClick={() => { this.props.showCreateSession(); this.props.hideMenu(); }}>
        New Session!
      </Button>
      <ReactModal isOpen={props.createSessionVisible}
        contentLabel="Detail Modal"
        shouldCloseOnOverlayClick={props.createSessionVisible}
        className="ReactModal__Content--after-open--new-session"
        >
          <Button className="exit-btn" onClick={props.hideCreateSession}>X</Button>
          <CreateSessionDetail
            addComment={props.addComment}
            currentNode={props.currentNode}
            setNode={props.setNode}
            updateNode={props.updateNode}
            thunkCreateSession={props.thunkCreateSession}
            clearComments={props.clearComments}
            user={props.user}
            hideCreateSession={props.hideCreateSession}
            thunkCreateSessionAndInvite={props.thunkCreateSessionAndInvite}
          />
        </ReactModal>
    </div>
  )
}

export default Profile;
