import React from 'react';
import Menu from './Menu.jsx';
import Session from './Session.jsx'


const Main = (props) => {
  return (
    <div>
      <h2>I am the Main component!</h2>
      <Menu />
      <button>Start a new Session</button>
      <Session /> 
    </div>
  )
}

export default Main;
