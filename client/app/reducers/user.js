function user(state = {userId: null, name: null, image: null, email: null}, action) {
  switch (action.type) {
    case 'ADD_USER':
      return {
        userId: action.userId,
        name: action.name,
        image: action.image,
        email: action.email
      };
    case 'REMOVE_USER':
      return {
        userId: null,
        name: null,
        image: null,
        email: null
      };
    default:
      return state;
  }
  return state;
}

export default user;
