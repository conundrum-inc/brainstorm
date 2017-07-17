function session(state = null, action) {
  switch (action.type) {
    case 'UPDATE_SESSION':
      return {
        sessionId: action.sessionId
      };
  }
  return state;
}

export default session;
