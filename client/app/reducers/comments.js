import _ from 'lodash';
import { commentsDummyData } from '../dummyData.js'

function comments(state = commentsDummyData, action) {
  switch(action.type){
    case 'ADD_COMMENT':
    console.log("Updating state Comment Added");
      return [...state, action.comment]; // comment is an object with all comment properties

    case 'EDIT_COMMENT':
      console.log("Comment Edited");
      var commentIndex = _.findIndex(state, ['_id', action.comment._id])

      return [
        ...state.slice(0, commentIndex), // before the comment we want to change
        action.comment,
        ...state.slice(commentIndex + 1) // after the comment we want to change
      ]

    case 'CLEAR_COMMENTS':
      console.log("Comments cleared!")
      return [] // clears comments from state

    case 'UPDATE_COMMENTS':
      console.log("Comments updated!")
      return action.comments.data // clears comments from state

    default:
      return state;
  }
  return state;
}

export default comments;
