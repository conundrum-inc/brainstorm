function user(state = {userId: null, name:null}, action) {
  switch (action.type) {
    case 'ADD_USER':
      return {
        userId: action.userId,
        name: action.name
      };
    case 'REMOVE_USER':
      return {
        userId: null,
        name: null
      };
    default:
      return state;
  }
  return state;
}

export default user;
