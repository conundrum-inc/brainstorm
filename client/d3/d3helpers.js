import * as d3 from 'd3'

const drawCircle = function(x, y, size) {
      d3.select('svg').append("circle")
          .attr('class', 'click-circle')
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", size);
    }

export const click = function() {
      var coords = d3.mouse(d3.select('svg').node());
      drawCircle(coords[0], coords[1], 50);
    }