import *  as axiosCall from '../axiosCalls'

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
  // console.log("Comment Added");
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

export function updateSession(comments) {
  console.log("Session Changed");
  return {
    type: 'UPDATE_SESSION',
    comments
  }
}

export function addUser(userId, name) {
  console.log("User Added");
  return {
    type: 'ADD_USER',
    userId,
    name
  }
}

export function removeUser() {
  console.log("User Removed");
  return {
    type: 'REMOVE_USER'
  }
}

export function showMenu() {
  return {
    type: 'SHOW_MENU'
  }
}

export function hideMenu() {
  return {
    type: 'HIDE_MENU'
  }
}

export function showDetail() {
  console.log('clicked!')
  return {
    type: 'SHOW_DETAIL'
  }
}

export function hideDetail() {
  return {
    type: 'HIDE_DETAIL'
  }
}

//test action for d3-redux integration 
export function addNode() {
  return {
    type: 'ADD_NODE',
    node
  }
}

export function addLink() {
  return {
    type: 'ADD_LINK',
    link
  }
}


////////////// thunk actionCreators ////////////////

export function thunkUpVote(userId, commentId) {
  return function(dispatch) {
    return axiosCall.UpVote(userId, commentId).then(
      score => dispatch(upVote(score, commentId))
    )
  }
}

export function thunkDownVote(userId, commentId) {
  return function(dispatch) {
    return axiosCall.DownVote(userId, commentId).then(
      score => dispatch(downVote(score, commentId))
    )
  }
}

export function thunkAddUser() {
  return function(dispatch) {
    console.log('hey in the thunk!')
    return axiosCall.login().then(
      (user) => {
        console.log('user', user)
        dispatch(addUser(user.data.id, user.data.name)) // CHECK THESE USER VALUES!!!!!!
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

export function thunkCreateSession(comment) {
  return function(dispatch) {
    return axiosCall.CreateSession(comment).then(
      comments => dispatch(updateSession(comments))
    )
  }
}

export function thunkSwitchSession(sessionId) {
  return function(dispatch) {
    return axiosCall.CreateSession(sessionId).then(
      comments => dispatch(updateSession(comments))
    )
  }
}

// not sure where the dispatch() function is coming from or what it's doing in these thunk functions (thunky!)

// deal with assign user once passport/google auth infrastucture is implemented
