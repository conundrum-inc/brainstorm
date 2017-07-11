import React from 'react';
import * as d3 from 'd3'
import { withFauxDOM } from 'react-faux-dom'

class Session extends React.Component {

  componentDidMount() {

    const drawCircle = function(x, y, size) {
      console.log('Drawing circle at', x, y, size);
      d3.select('svg').append("circle")
          .attr('class', 'click-circle')
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", size);
    }

    const click = function() {
      var coords = d3.mouse(d3.select('svg').node());
      console.log(coords);
      drawCircle(coords[0], coords[1], 50);
    }

    const board = this.props.connectFauxDOM('div','board')
    d3.select(board)
      .append('svg')
      .attr("height", "100%")
      .attr("width", "100%")
      .on('click', function() {

        const x = d3.event.layerX
        const y = d3.event.layerY
        click()
      });
    this.props.animateFauxDOM(800);
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