import React from 'react'

import Menu from './Menu.jsx'

const MySessions = () => {
  return (
      <div>
        <h3>Your Brainstorm sessions:</h3>
        <ul>
          <li>Hack Reactor Thesis Project</li>
          <li>Screenplay ideas</li>
        </ul>
        <h3>Sessions you contribute to:</h3>
        <ul>
          <li>Lucy's Surprise Party</li>
          <li>Ultimate Dessert Recipe Competition</li>
          <li>Startup ideas</li>
        </ul>
      </div>
    )
}

export default MySessions


// Maybe split up owned sessions and contributing sessions into two separate components?
