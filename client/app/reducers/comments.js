import _ from 'lodash';

function comments(state = [], action) {
  switch(action.type){
    case 'ADD_COMMENT':
    console.log("Comment Added");
    console.log("action", JSON.stringify(action.comment.body));
      return [...state, action.comment]; // comment is an object with all comment properties

    case 'EDIT_COMMENT':
      console.log("Comment Edited");
      var commentIndex = _.findIndex(state, action.comment._id)

      return [
        ...state.slice(0, commentIndex), // before the comment we want to change
        action.comment,
        ...state.slice(commentIndex + 1) // after the comment we want to change
      ]
    default:
      return state;
  }
  return state;
}

// function comments(state = [], action) {
//   if(typeof action.postId !== 'undefined') {
//     return {
//       // ...state,
//       // [action.postId]: postComments(state[action.postId], action)
//
//     }
//   }
//   return state;
// }

// ^^ Above commented-out code is from the Redux example

export default comments;
