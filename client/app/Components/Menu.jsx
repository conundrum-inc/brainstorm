import React from 'react'
import { NavLink } from 'react-router-dom'

import { PROFILE_PAGE_ROUTE,
         LOGOUT_PAGE_ROUTE,
         SESSIONS_PAGE_ROUTE,
         MAIN_PAGE_ROUTE
       } from '../routes.js'

const Menu = (props) => {
  if (props.menuVisible) {
    return (
      <div onClick={() => props.toggleClick()}>
        {[
          {route: MAIN_PAGE_ROUTE, label: 'Home' },
          {route: PROFILE_PAGE_ROUTE, label: 'My Profile'},
          {route: LOGOUT_PAGE_ROUTE, label: 'Logout'}
        ].map((link) => {
          return (
            <div key={link.label}>
              <NavLink
                to={link.route}
                exact
                >
                  {link.label}
                </NavLink>
              </div>
            )
          })
        }
      </div>
    )
  } else {
    return (
      <button className="menu-burger" onClick={() => props.toggleClick()}>Menu Burger</button>
    )
  }
}

export default Menu
