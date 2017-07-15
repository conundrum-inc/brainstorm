import React from 'react';

const NodeDetail = (props) => {
  return (
    <div>
      <h2>Idea Title</h2>
      <p>This idea is literally the best idea ever. We should totally do this idea. You know what's awesome? This idea. Why? Because! Vote for Pedro!</p>
      <button className="upvote" onClick="blahblahblah"></button>
      <button className="downvote" onClick="blahblahblah"></button>
      <h4>Node Child 1</h4>
      <h4>Node Child 2</h4>
      <h4>Node Child 3</h4>
      <form>
        <label>
          Title:
          <input type="text" name="title" />
        </label>
        <label>
          Description:
          <input type="text" name="text" />
        </label>
        <input type="submit" value="Add Comment" onClick={() => this.props.addComment('Jordan', '345', '678', 'first comment', 'yassssss')} />
      </form>
    </div>
  )
}

export default NodeDetail;
