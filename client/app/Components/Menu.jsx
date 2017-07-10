import React from 'react'
import { NavLink } from 'react-router-dom'

import { PROFILE_PAGE_ROUTE,
         LOGIN_PAGE_ROUTE,
         SESSIONS_PAGE_ROUTE
       } from '../routes.js'

const Menu = () => {
  return (
    <nav>
      {[
        {route: PROFILE_PAGE_ROUTE, label: 'My Profile'},
        {route: LOGIN_PAGE_ROUTE, label: 'Logout'},
        {route: SESSIONS_PAGE_ROUTE, label: 'My Sessions'}
      ].map((link) => {
        return (
            <NavLink 
              key={link.label}
              to={link.route}
              exact
            >
              {link.label}
            </NavLink>
          )
      })
    }
    </nav>
    )
}

export default Menu