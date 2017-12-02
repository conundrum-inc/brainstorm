import React from 'react'
import { AUTH_PAGE_ROUTE } from '../routes.js';
import Menu from './Menu.jsx'

const MySessions = (props) => {

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
            if (session.creator_id !== props.user.userId) {
              return <div
                key={session._id}
                className="profile-accessed-session session-title"
                onClick={(e) => {props.thunkUpdateSession(e.target.getAttribute('data-key'))}}
                >
                <a href={AUTH_PAGE_ROUTE}>
                  <li data-key={session._id}>
                    {session.title}
                  </li>
                </a>
              </div>            }
          })}
        </ul>
      </div>
    )
}

export default MySessions
