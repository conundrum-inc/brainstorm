import React from 'react';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { MAIN_PAGE_ROUTE } from '../routes.js';

const Profile = (props) => {
  console.log('Profile props: ', props)
  return (
    <div className="profile-text">
      <h3>Your profile:</h3>
      <img src={props.user.image}></img>
      <p className="account-name">{props.user.name}</p>
      <p className="email">{props.user.email}</p>
      <Button
        className="profile-btn-new-session"
        href={MAIN_PAGE_ROUTE}
        onClick={() => { console.log('making session modal visible'); props.showCreateSession(); }}>
        New Session!
      </Button>
    </div>
  )
}

export default Profile;
