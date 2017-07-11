function postComments(state = [], action) {
  switch(action.type){
    case 'ADD_COMMENT':
      console.log("Comment Added");
      return [...state,{
        user: action.comment.creator_id,
        parent: action.comment.parent_id,
        title: action.comment.title,
        text: action.comment.text,
        children: action.comment.children,
        score: action.comment.score
        //parent_id, children, creator_id, session_id, title, text, upvotes, downvotes, score
      }];
    case 'EDIT_COMMENT':
      console.log("Comment Edited");
      return [
        // ...state.slice(0, action.i),
        // ...state.slice(action.i + 1)
      ]
    default:
      return state;
  }
  return state;
}

function comments(state = [], action) {
  if(typeof action.postId !== 'undefined') {
    return {
      // ...state,
      // [action.postId]: postComments(state[action.postId], action)
    }
  }
  return state;
}

export default comments;
