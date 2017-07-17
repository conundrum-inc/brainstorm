import _ from 'lodash';
import { commentsDummyData } from '../dummyData.js'

function comments(state = commentsDummyData, action) {
  switch(action.type){
    case 'ADD_COMMENT':
    console.log("Updating state Comment Added");
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

export default comments;
