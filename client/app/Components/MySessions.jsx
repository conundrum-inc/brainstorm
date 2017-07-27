import React from 'react'
import { AUTH_PAGE_ROUTE } from '../routes.js';
import Menu from './Menu.jsx'

const MySessions = (props) => {
  console.log('MySessions props: ', props);
  // var handleClick = function() {
  //   console.log('clicked!');
  // }

  // function handleClick(e) {
  //   console.log(e.target.getAttribute('data-key'), props);
  //   // props.thunkUpdateSession(e.target.getAttribute('data-key'));
  // }

 // href={MAIN_PAGE_ROUTE} --- goes in a tag on line 28

  return (
      <div>
        <h3>Your Brainstorm sessions:</h3>
        <ul>
          {props.user.created_sessions.map((session) => {
            return <div
              key={session._id}
              className="profile-created-session session-title"
              onClick={(e) => {props.thunkUpdateSession(e.target.getAttribute('data-key'))}}
              >
              <a href={AUTH_PAGE_ROUTE}>
                <li data-key={session._id}>
                  {session.title}
                </li>
              </a>
            </div>
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
