function createSessionVisible(state = false, action) {
  switch (action.type) {
    case 'SHOW_CREATE_SESSION':
      return true;
    case 'HIDE_CREATE_SESSION':
      return false;
    default:
      return state;
  }
  return state;
}

export default createSessionVisible;
