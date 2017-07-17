import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
import { PROFILE_PAGE_ROUTE,
         LOGOUT_PAGE_ROUTE,
         SESSIONS_PAGE_ROUTE,
         MAIN_PAGE_ROUTE
       } from '../routes.js'

const Menu = () => {
  return (
    <DropdownButton id="dropdown-btn-menu" bsStyle="info" title="Menu">
      <MenuItem key="1" href={MAIN_PAGE_ROUTE}>
        <NavLink to={MAIN_PAGE_ROUTE}>Home</NavLink>
      </MenuItem>
      <MenuItem key="2" href={PROFILE_PAGE_ROUTE}>
        <NavLink to={PROFILE_PAGE_ROUTE}>My Profile</NavLink>
      </MenuItem>
      <MenuItem key="3" href={LOGOUT_PAGE_ROUTE}>
        <NavLink to={LOGOUT_PAGE_ROUTE}>Logout</NavLink>
      </MenuItem>
    </DropdownButton>
  )
}

export default Menu
