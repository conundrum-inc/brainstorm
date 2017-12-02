import _ from 'lodash';
import { commentsDummyData } from '../dummyData.js'

function comments(state = commentsDummyData, action) {
  switch(action.type){
    case 'ADD_COMMENT':
    
      return [...state, action.comment]; // comment is an object with all comment properties

    case 'EDIT_COMMENT':
      
      var commentIndex = _.findIndex(state, ['_id', action.comment._id])

      return [
        ...state.slice(0, commentIndex), // before the comment we want to change
        action.comment,
        ...state.slice(commentIndex + 1) // after the comment we want to change
      ]

    case 'CLEAR_COMMENTS':
      
      return [] // clears comments from state

    case 'UPDATE_COMMENTS':
      
      return action.comments // clears comments from state

    default:
      return state;
  }
  return state;
}

export default comments;
