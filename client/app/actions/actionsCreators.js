import fetchUpVote from './fetchCalls'
import fetchDownVote from './fetchCalls'
import fetchAddComment from './fetchCalls'
import fetchEditComment from './fetchCalls'
import fetchComments from './fetchCalls'

export function upVote(score, commentId) {
  console.log("UPVOTE!");
  return {
    type: 'UPVOTE',
    score,
    commentId
  }
}

export function downVote(score, commentId) {
  console.log("DOWNVOTE");
  return {
    type: 'DOWNVOTE',
    score,
    commentId
  }
}

export function addComment(comment) { //comment will be an object with properties {userid, sessionId, commentId, title, text}
  console.log("Comment Added");
  return {
    type: 'ADD_COMMENT',
    comment
  }
}

export function editComment(commentId, title, text) {
  console.log("Comment Edited");
  return {
    type: 'EDIT_COMMENT',
    commentId,
    title,
    text
  }
}

export function updateSession(sessionId) {
  console.log("Session Changed");
  return {
    type: 'UPDATE_SESSION',
    sessionId
  }
}

export function assignUser(userId) {
  console.log("User Assigned");
  return {
    type: 'ASSIGN_USER',
    userId
  }
}

export function showMenu() {
  return {
    type: 'SHOW_MENU'
  }
}

export function hideMenu() {
  return {
    type: 'SHOW_MENU'
  }
}

export function showDetail() {
  return {
    type: 'SHOW_DETAIL'
  }
}

export function hideDetail() {
  return {
    type: 'SHOW_DETAIL'
  }
}


////////////// thunk actionCreators ////////////////

export function thunkUpVote(userId, commentId) {
  return function(dispatch) {
    return fetchUpVote(userId, commentId).then(
      score => dispatch(upVote(score, commentId));
    )
  }
}

export function thunkDownVote(userId, commentId) {
  return function(dispatch) {
    return fetchDownVote(userId, commentId).then(
      score => dispatch(downVote(score, commentId));
    )
  }
}

export function thunkAddComment(userId, parentId, sessionId, title, text) {
  return function(dispatch) {
    return fetchAddComment(userId, parentId, sessionId, title, text).then(
      comment => dispatch(addComment(comment)); // comment will be an object
    )
  }
}
