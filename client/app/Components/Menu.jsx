import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, DropdownButton, MenuItem, ButtonGroup } from 'react-bootstrap';
import { PROFILE_PAGE_ROUTE,
         LOGOUT_PAGE_ROUTE,
         SESSIONS_PAGE_ROUTE,
         MAIN_PAGE_ROUTE
       } from '../routes.js'

const Menu = (props) => {
  return (
    <ButtonGroup>
      <Button bsStyle="info" href={MAIN_PAGE_ROUTE}>
        <NavLink to={MAIN_PAGE_ROUTE}></NavLink>
        Home
      </Button>
      <Button bsStyle="info" href={PROFILE_PAGE_ROUTE}>
        <NavLink to={PROFILE_PAGE_ROUTE}></NavLink>
        My Profile
      </Button>
      <Button bsStyle="info" className="add-comment" onClick={() => props.showCreateSession()}>New Session!</Button>
      <Button bsStyle="info" href={LOGOUT_PAGE_ROUTE}>
        <NavLink to={LOGOUT_PAGE_ROUTE}></NavLink>
        Logout
      </Button>
    </ButtonGroup>
  )
}

export default Menu
