import React from 'react'
import { MAIN_PAGE_ROUTE } from '../routes.js';
import Menu from './Menu.jsx'

const MySessions = (props) => {
  console.log('MySessions props: ', props);
  // var handleClick = function() {
  //   console.log('clicked!');
  // }


  return (
      <div>
        <h3>Your Brainstorm sessions:</h3>
        <ul>
          {props.user.created_sessions.map((session) => {
            return <li
                      className="profile-created-session"
                      onClick={(session) => {props.thunkUpdateSession(session._id)}}
                    >
                      <a href={MAIN_PAGE_ROUTE}>
                        {session.title}
                      </a>
                  </li>
          })}
        </ul>
        <h3>Sessions you contribute to:</h3>
        <ul>
          {props.user.accessible_sessions.map((session) => {
            if (props.user.created_sessions.includes(session)) {
              return <li className="profile-accessed-session" onClick={() => {console.log('accessible clicked!')}}>{session.title}</li>
            }
          })}
        </ul>
      </div>
    )
}

export default MySessions
