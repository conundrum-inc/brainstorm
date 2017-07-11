import fetchUpVote from './fetchCalls'
import fetchDownVote from './fetchCalls'
import fetchAddComment from './fetchCalls'
import fetchEditComment from './fetchCalls'
import fetchComments from './fetchCalls'
import fetchEditComment from './fetchCalls'
import createSession from './fetchCalls'


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

export function addComment(comment) { //comment will be an object with properties parent_id, children, creator_id, session_id, title, text, upvotes, downvotes, score
  console.log("Comment Added");
  return {
    type: 'ADD_COMMENT',
    comment
  }
}

export function editComment(comment) { //comment will be an object with properties {userid, sessionId, commentId, title, text}
  console.log("Comment Added");
  console.log("Comment Edited");
  return {
    type: 'EDIT_COMMENT',
    comment
  }
}

export function updateSession(comments) {
  console.log("Session Changed");
  return {
    type: 'UPDATE_SESSION',
    comments
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

export function thunkEditComment(commentId, title, text) {
  return function(dispatch) {
    return fetchEditComment(commentId, title, text).then(
      comment => dispatch(editComment(comment)); // comment will be an object
    )
  }
}

export function thunkCreateSession(comment) {
  return function(dispatch) {
    return fetchCreateSession(comment).then(
      comments => dispatch(updateSession(comments));
    )
  }
}

export function thunkSwitchSession(sessionId) {
  return function(dispatch) {
    return fetchCreateSession(sessionId).then(
      comments => dispatch(updateSession(comments));
    )
  }
}

// deal with assign user once passport/google auth infrastucture is implemented
