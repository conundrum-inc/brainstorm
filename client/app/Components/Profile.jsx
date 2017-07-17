import React from 'react';

const Profile = (props) => {
  console.log('Profile props: ', props);
  var first = props.user.name.split(' ')[0];
  console.log(first);
  return (
    <div>
      <h3>{first}'s profile:</h3>
      <ul>
        <li>Name</li>
        <li>Username</li>
      </ul>
    </div>
  )
}

export default Profile;
