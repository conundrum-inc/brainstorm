import React from 'react';
import * as d3 from 'd3'
import { withFauxDOM } from 'react-faux-dom'
import { click } from '../../d3/d3helpers.js'

class Session extends React.Component {

  componentDidMount() {

    

    const board = this.props.connectFauxDOM('div','board')
    d3.select(board)
      .append('svg')
      .attr("height", "100%")
      .attr("width", "100%")
      .on('click', function() {
        click()
      });
    
  }

  render() {

    return (
      <div>
        <div>
          {this.props.board}
        </div>
      </div>
    )
  }

}


export default withFauxDOM(Session);