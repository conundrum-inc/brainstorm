import React from 'react';
import {render} from 'react-dom';
import { createStore } from 'redux'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <p> Hello World!</p>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));

//add react router here
