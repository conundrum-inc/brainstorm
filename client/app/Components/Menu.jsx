import React from 'react'
import { NavLink } from 'react-router-dom'

import { PROFILE_PAGE_ROUTE,
         LOGIN_PAGE_ROUTE,
         SESSIONS_PAGE_ROUTE,
         MAIN_PAGE_ROUTE
       } from '../routes.js'

const Menu = (props) => {
  if (props.menuVisible) {
    return (
      <nav onClick={() => props.onClick()>
        {[
          {route: MAIN_PAGE_ROUTE, label: 'Home' },
          {route: PROFILE_PAGE_ROUTE, label: 'My Profile'},
          {route: LOGIN_PAGE_ROUTE, label: 'Logout'}
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
      </nav>
    )
  } else {
    console.log('props: ', props);
    return (
      <button className="menu-burger" onClick={() => props.onClick()}>Menu Burger</button>
    )
  }
}

export default Menu
