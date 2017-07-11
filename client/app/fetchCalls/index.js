export function fetchUpVote(userId, commentId) {
  fetch({
    type: 'POST',
    url: '/upvote',
    body: {
      user_id: userId,
      comment_id: commentId
    }
  });
}

export function fetchDownVote(userId, commentId) {
  fetch({
    type: 'POST',
    url: '/downvote',
    body: {
      user_id: userId,
      comment_id: commentId
    }
  });
}

export function fetchAddComment(userId, parentId, sessionId, title, text) {
  fetch({
    type: 'POST',
    url: '/comment',
    body: {
      user_id: userId,
      parent_id: parentId,
      session_id: sessionId,
      title: title,
      text: text
    }
  })
}

export function fetchEditComment(commentId, title, text) {
  fetch({
    type: 'POST',
    url: '/comment',
    body: {
      comment_id: commentId,
      title: title,
      text: text
    }
  })
}

export function fetchComments(sessionId) {
  fetch({
    type: 'GET',
    url: '/comment',
    query: sessionId // params or query??
  })
}

export function createSession(comment) { // comment will be an object with keys: userId, title, text
  fetch({
    type: 'POST',
    url: '/session',
    body: comment
  })
}

export function fetchSession(sessionId) {
  fetch({
    type: 'GET',
    url: '/session'
    query: sessionId // params or query??
  })
}