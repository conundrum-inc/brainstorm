import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, DropdownButton, MenuItem, ButtonGroup } from 'react-bootstrap';
import CreateSessionDetail from './CreateSessionDetail.jsx';
import ReactModal from 'react-modal';
import { PROFILE_PAGE_ROUTE,
         LOGOUT_PAGE_ROUTE,
         SESSIONS_PAGE_ROUTE,
         MAIN_PAGE_ROUTE
       } from '../routes.js'

const Menu = (props) => {
  return (
    <div>
      <ButtonGroup>
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
      <ReactModal isOpen={props.createSessionVisible}
        contentLabel="Detail Modal"
        shouldCloseOnOverlayClick={props.createSessionVisible}
        >
          <Button onClick={props.hideCreateSession}>X</Button>
          <CreateSessionDetail
            addComment={props.addComment}
            currentNode={props.currentNode}
            setNode={props.setNode}
            updateNode={props.updateNode}
          />
        </ReactModal>
    </div>
  )
}

export default Menu
