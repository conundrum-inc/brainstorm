import React from 'react'

import Menu from './Menu.jsx'

const MySessions = (props) => {
  console.log('props: ', props);
  var handleClick = function() {
    console.log('clicked!');
  }


  return (
      <div>
        <h3>Your Brainstorm sessions:</h3>
        <ul>
          {props.user.created_sessions.map((session) => {
            return <li onClick={handleClick()}>{session.title}</li>
          })}
        </ul>
        <h3>Sessions you contribute to:</h3>
        <ul>
          {props.user.accessible_sessions.map((session) => {
            if (props.user.created_sessions.includes(session)) {
              return <li onClick={handleClick()}>{session.title}</li>
            }
          })}
        </ul>
      </div>
    )
}

export default MySessions
