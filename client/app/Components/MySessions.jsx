import React from 'react'

import Menu from './Menu.jsx'

const MySessions = (props) => {
  console.log('props: ', props);

  return (
      <div>
        <h3>Your Brainstorm sessions:</h3>
        <ul>
          {props.user.created_sessions.map((session) => {
            return <li onClick={console.log('created session item click!')}>{session.title}</li>
          })}
        </ul>
        <h3>Sessions you contribute to:</h3>
        <ul>
          {props.user.accessible_sessions.map((session) => {
            if (props.user.created_sessions.includes(session)) {
              return <li onClick={console.log('accessed session item click!')}>{session.title}</li>
            }
          })}
        </ul>
      </div>
    )
}

export default MySessions


// Maybe split up owned sessions and contributing sessions into two separate components?
