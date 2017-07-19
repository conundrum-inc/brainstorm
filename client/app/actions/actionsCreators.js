import *  as axiosCall from '../axiosCalls'
import io from "socket.io-client";
var socket = io();

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
  console.log("Comment Added - SOCKET TEST");
  return {
    type: 'ADD_COMMENT',
    comment
  }
}

export function editComment(comment) { //comment will be an object with properties {userid, sessionId, commentId, title, text}
  console.log("Comment Edited");
  return {
    type: 'EDIT_COMMENT',
    comment
  }
}

export function clearComments() {
  console.log("Comments Cleared");
  return {
    type: 'CLEAR_COMMENTS'
  }
}

export function updateSession(sessionId) {
  console.log("Session Changed");
  return {
    type: 'UPDATE_SESSION',
    sessionId
  }
}

export function addUser(userId, name, image, email, created_sessions, accessible_sessions, comments) {
  return {
    type: 'ADD_USER',
    userId,
    name,
    image,
    email,
    created_sessions,
    accessible_sessions,
    comments
  }
}

export function removeUser() {
  return {
    type: 'REMOVE_USER'
  }
}

export function showCreateSession() {
  return {
    type: 'SHOW_CREATE_SESSION'
  }
}

export function hideCreateSession() {
  return {
    type: 'HIDE_CREATE_SESSION'
  }
}

export function showDetail() {
  return {
    type: 'SHOW_DETAIL'
  }
}

export function hideDetail() {
  return {
    type: 'HIDE_DETAIL'
  }
}

export function showMenu() {
  console.log('showing menu');
  return {
    type: 'SHOW_MENU'
  }
}

export function hideMenu() {
  return {
    type: 'HIDE_MENU'
  }
}


//test action for d3-redux integration
export function addNode(node) {
  return {
    type: 'ADD_NODE',
    node
  }
}

export function addLink(link) {
  return {
    type: 'ADD_LINK',
    link
  }
}

export function setNode(node) {
  return {
    type: 'SET_NODE',
    node
  }
}

export function updateNode(node) {
  return {
    type: 'UPDATE_NODE',
    node
  }
}


////////////// thunk actionCreators ////////////////

export function thunkUpVote(userId, commentId) {
  return function(dispatch) {
    return axiosCall.UpVote(userId, commentId).then(
      (comment) => {
        dispatch(editComment(comment.data))
      }
    )
  }
}

export function thunkDownVote(userId, commentId) {
  return function(dispatch) {
    return axiosCall.DownVote(userId, commentId).then(
      comment => dispatch(editComment(comment.data))
    )
  }
}

export function thunkAddUser() {
  return function(dispatch) {
    console.log('hey in the thunk!')
    return axiosCall.login().then(
      (user) => {
        console.log('user data', user.data)
        dispatch(addUser(user.data[0]._id, user.data[0].displayName, user.data[0].image, user.data[0].email, user.data[0].created_sessions, user.data[0].accessible_sessions, user.data[0].comments)) // CHECK THESE USER VALUES!!!!!!
      }
    )
  }
}

export function thunkRemoveUser() {
  return function(dispatch) {
    return axiosCall.logout().then(
      () => {
        dispatch(removeUser())
      }
    )
  }
}

export function thunkAddComment(userId, parentId, sessionId, title, text) {
  return function(dispatch) {
    return axiosCall.AddComment(userId, parentId, sessionId, title, text).then(
      (comment) => {
        socket.emit('new comment', comment.data);
        dispatch(addComment(comment.data))
      }
    )
  }
}

export function thunkEditComment(commentId, title, text) {
  return function(dispatch) {
    return axiosCall.EditComment(commentId, title, text).then(
      comment => dispatch(editComment(comment.data))
    )
  }
}

export function thunkCreateSession(title, text, userId) {
  return function(dispatch) {
    return axiosCall.CreateSession(title, text, userId).then(
      (comment) => {
        console.log('comment in thunkCreateSession', comment.data.session_id)
        dispatch(updateSession(comment.data.session_id))
        dispatch(addComment(comment.data))
      }
    )
  }
}

export function thunkUpdateSession(sessionId) {
  return function(dispatch) {
    return axiosCall.CreateSession(sessionId).then(
      comments => dispatch(updateSession(comments))
    )
  }
}

// not sure where the dispatch() function is coming from or what it's doing in these thunk functions (thunky!)

// deal with assign user once passport/google auth infrastucture is implemented
