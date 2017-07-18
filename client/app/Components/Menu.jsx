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
      <button className="menu-button" onClick={() => props.showMenu()}>Menu</button>
      <ReactModal isOpen={props.menuVisible}
                  contentLabel="Menu Modal"
                  shouldCloseOnOverlayClick={props.menuVisible}
      >
        <Button onClick={props.hideMenu}>X</Button>
        <Button bsStyle="info" className="add-comment" onClick={() => props.showCreateSession()}>New Session!</Button>
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
            thunkCreateSession={props.thunkCreateSession}
          />
        </ReactModal>
      </ReactModal>
    </div>
  )
}

export default Menu

/* <ButtonGroup>
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
      thunkCreateSession={props.thunkCreateSession}
    />
  </ReactModal> */
