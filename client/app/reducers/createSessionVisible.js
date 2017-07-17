function createSessionVisible(state = false, action) {
  switch (action.type) {
    case 'SHOW_CREATE_SESSION':
      console.log("Showing Create Session");
      return true;
    case 'HIDE_CREATE_SESSION':
      console.log('Hiding Create Session');
      return false;
    default:
      return state;
  }
  return state;
}

export default createSessionVisible;
