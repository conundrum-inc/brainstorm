import React from 'react';

const NodeModal = (props) => {
  return (
    <div>
      <h2>Idea Title</h2>
      <p>This idea is literally the best idea ever. We should totally do this idea. You know what's awesome? This idea. Why? Because! Vote for Pedro!</p>
      <button className="add-comment" onClick={() => this.props.addComment('123', '345', '678', 'first comment', 'yassssss')}>Add Comment</button>
      <button>upvote</button>
      <button>downvote</button>
      <h4>Node Child 1</h4>
      <h4>Node Child 2</h4>
      <h4>Node Child 3</h4>
    </div>
  )
}

export default NodeModal;
