import React from 'react';
import Menu from './Menu.jsx';
import Session from './Session.jsx'


const Main = (props) => {
  // console.log(props);
  return (
    <div>
      <h2>I am the Main component!</h2>
      {/* <button className="add-comment" onClick={() => props.addComment('123', '345', '678', 'first comment', 'yassssss')}>Add Comment</button> */}
      <Session showDetail={props.showDetail}
               hideDetail={props.hideDetail}
               detailViewVisible={props.detailViewVisible}
               comments={props.comments}
               nodes={props.nodes}
               links={props.links}
               showMenu={props.showMenu}
               hideMenu={props.hideMenu}
               menuVisible={props.menuVisible}
               addComment={props.addComment}
      />
    </div>
  )
}

export default Main;

// {/* <Menu className="menu-button" menuVisible={props.menuVisible} onClick={() => props.menuVisible ? props.hideMenu() : props.showMenu()}/> */}
//
