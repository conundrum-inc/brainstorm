import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';


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
    </div>
  )
}

export default Profile;
