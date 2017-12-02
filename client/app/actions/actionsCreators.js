import *  as axiosCall from '../axiosCalls'

export function addSession(session) {
  return {
    type: 'ADD_SESSION',
    session
  }
}

export function upVote(score, commentId) {

  return {
    type: 'UPVOTE',
    score,
    commentId
  }
}

export function downVote(score, commentId) {

  return {
    type: 'DOWNVOTE',
    score,
    commentId
  }
}


export function addComment(comment) {
  
  return {
    type: 'ADD_COMMENT',
    comment
  }
}

export function editComment(comment) {
  
  return {
    type: 'EDIT_COMMENT',
    comment
  }
}

export function clearComments() {
  
  return {
    type: 'CLEAR_COMMENTS'
  }
}

export function updateSession(sessionId, title) {

  return {
    type: 'UPDATE_SESSION',
    sessionId,
    title
  }
}

export function updateComments(comments) {
  return {
    type: 'UPDATE_COMMENTS',
    comments
  }
}

export function updateUserCreatedSessions(sessionId) {
  
  return {
    type: 'UPDATE_USER_CREATED_SESSIONS',
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

export function showInviteDetail() {
  return {
    type: 'SHOW_INVITE_DETAIL'
  }
}

export function hideInviteDetail() {
  return {
    type: 'HIDE_INVITE_DETAIL'
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

export function showEditCommentDetail() {
  return {
    type: 'SHOW_EDIT_COMMENT_DETAIL'
  }
}

export function hideEditCommentDetail() {
  return {
    type: 'HIDE_EDIT_COMMENT_DETAIL'
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
        socket.emit('upvote', comment.data);
      }
    )
  }
}

export function thunkDownVote(userId, commentId) {
  return function(dispatch) {
    return axiosCall.DownVote(userId, commentId).then(
      (comment) => {
        dispatch(editComment(comment.data))
        socket.emit('downvote', comment.data);
      }
    )
  }
}

export function thunkAddUser() {
  return function(dispatch) {
    return axiosCall.login().then(
      (user) => {
         
        dispatch(addUser(user.data[0]._id, user.data[0].displayName, user.data[0].image, user.data[0].email, user.data[0].created_sessions, user.data[0].accessible_sessions, user.data[0].comments)) // CHECK THESE USER VALUES!!!!!!
        //send the email to the server to identify the socket
        socket.emit('add email', user.data[0].email)
      }
    )
  }
}

export function thunkUpdateUser(userId) {
  return function(dispatch) {
    return axiosCall.findUser(userId).then(
      (user) => {
        
        dispatch(addUser(user.data._id, user.data.displayName, user.data.image, user.data.email, user.data.created_sessions, user.data.accessible_sessions, user.data.comments)) // CHECK THESE USER VALUES!!!!!!
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
        axiosCall.GetSession(comment.data.session_id).then(
          (comments) => {
            dispatch(updateComments(comments.data))
            
            socket.emit('new comment', comments.data);
          }
        )
      }
    )
  }
}

export function thunkEditComment(commentId, title, text) {
  return function(dispatch) {
    return axiosCall.EditComment(commentId, title, text).then(
      comment => {
        
        dispatch(editComment(comment.data))
        socket.emit('update', comment.data);
      }
    )
  }
}

export function thunkUpdateCurrentNode(commentId) {
  return function(dispatch) {
    return axiosCall.GetComment(commentId).then(
      comment => {
        dispatch(setNode(comment.data))
      }
    )
  }
}

export function thunkCreateSession(title, text, userId) {
  return function(dispatch) {
    return axiosCall.CreateSession(title, text, userId).then(
      (comment) => {
        
        //subscribe the socket to the room
        socket.emit('join session', comment.data.session_id); 
        dispatch(updateSession(comment.data.session_id, title))
        dispatch(addComment(comment.data))
        dispatch(thunkUpdateUser(userId))
      }
    )
  }
}

export function thunkCreateSessionAndInvite(title, text, userId, emailArray) {
  return function(dispatch) {
    return axiosCall.CreateSession(title, text, userId).then(
      (comment) => {
        
        //subscribe the socket to the room
        socket.emit('join session', comment.data.session_id);
        //notify invited users
        var session = {
          _id: comment.data.session_id,
          title: title
        }
        socket.emit('invite users', emailArray, session); 
        dispatch(updateSession(comment.data.session_id, title))
        dispatch(addComment(comment.data))
        dispatch(thunkUpdateUser(userId))
        axiosCall.inviteUsers(emailArray, comment.data.session_id)
      }
    )
  }
}
export function thunkUpdateSession(sessionId, title) {
  return function(dispatch) {
    return axiosCall.GetSession(sessionId).then(
      (comments) => {
        
        //subscribe the socket to the room
        socket.emit('join session', sessionId); 
        dispatch(updateSession(sessionId, title))
        dispatch(updateComments(comments.data))
      }
    )
  }
}

// export function thunkDeleteSession(sessionId) {
//   return function(dispatch) {
//     return axiosCall.DeleteSession(sessionId).then(
//       () => {
//         // figure out what will be returned from delete and what will go here...
//       }
//     )
//   }
// }
