function user(state = {userId: null, name: null, image: null, email: null}, action) {
  switch (action.type) {
    case 'ADD_USER':
      return {
        userId: action.userId,
        name: action.name,
        image: action.image,
        email: action.email,
        created_sessions: action.created_sessions,
        accessible_sessions: action.accessible_sessions,
        comments: action.comments
      };
    case 'REMOVE_USER':
      return {
        userId: null,
        name: null,
        image: null,
        email: null,
        created_sessions: null,
        accessible_sessions: null,
        comments: null
      };
    default:
      return state;
  }
  return state;
}

export default user;
