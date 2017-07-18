import React from 'react';

const Profile = (props) => {
  console.log('Profile props: ', props);
  var first = props.user.name.split(' ')[0];
  var username = props.user.email.split('@')[0];
  console.log(first);
  return (
    <div>
      <h3>{first}'s profile:</h3>
      <ul>
        <img src={props.user.image}></img>
        <p>Name: {props.user.name}</p>
        <p>Username: @{username}</p>
      </ul>
    </div>
  )
}

export default Profile;
