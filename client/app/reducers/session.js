function session(state = {sessionId: null, title: null}, action) {
  switch (action.type) {
    case 'UPDATE_SESSION':
      return {
        sessionId: action.sessionId,
        title: action.title
      };
  }
  return state;
}

export default session;
