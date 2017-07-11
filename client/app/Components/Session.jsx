import React from 'react';
import { select } from 'd3-selection';


const ideas = [];


const Session = (props) => {

  const draw = (val) => {
    console.log(val);
    select("#session").append("div")
    ideas.push(val);
    var p = select("#session").selectAll("div")
              .data(ideas)
              .text(function(d,i){return i + ": " + d;})

  }

  const handleClick = (e) => {
    e.preventDefault()
    draw(document.getElementById("myVal").value)
    document.getElementById("myVal").value = '';
    console.log('clicked!')
    return false;
  }

  return (
    <div>
      I am a session!
      <form name="myform" onSubmit={handleClick}>
        <input name="Submit"  type="submit" value="Post idea"></input>
        <input type="text" id="myVal" placeholder="Add some text"></input>
      </form>
      <div id="session"></div>
      

    </div>
  )
}

export default Session;