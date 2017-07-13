import React from 'react';
import Menu from './Menu.jsx';
import Session from './Session.jsx'


const Main = (props) => {
  // console.log(props);
  return (
    <div>
      <h2>I am the Main component!</h2>
      <Menu />
      <button className="add-comment" onClick={() => props.addComment('123', '345', '678', 'first comment', 'yassssss')}>Add Comment</button>
      <Session />
    </div>
  )
}

export default Main;
