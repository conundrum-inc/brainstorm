import React from 'react';

const Profile = (props) => {
  console.log('Profile props: ', props);
  var first = props.user.name.split(' ')[0];
  var username = props.user.email;
  console.log(first);
  return (
    <div className="profile-text">
      <h3>Your profile:</h3>
      <img src={props.user.image}></img>
      <p>Name: {props.user.name}</p>
      <p>Username: {username}</p>
    </div>
  )
}

export default Profile;
