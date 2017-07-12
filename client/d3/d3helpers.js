import * as d3 from 'd3'

const data = ["hello world"]

const drawCircle = function(x, y, size) {

  var elem = d3.select("svg").selectAll("g myCircleText")
                .data(data)

  var elemEnter = elem.enter()
    .append("g")
    .attr("transform", function(d){ return "translate("+x+","+y+")"})

  var circle = elemEnter.append("circle")
    .attr("r", size)
    .attr("stroke","black")
    .attr("fill","white")

  elemEnter.append("text")
    .attr("dx", function(d){return -20})
    .text(function(d){return data[0]})

  elemEnter.on('click', function() {
    console.log('clicked!')
  })

  // d3.select('svg').append("circle")
  //     .attr("cx", x)
  //     .attr("cy", y)
  //     .attr("r", size)
  //     .style("color","pink");
}

export const click = function() {
      var coords = d3.mouse(d3.select('svg').node());
      drawCircle(coords[0], coords[1], 50);
    }