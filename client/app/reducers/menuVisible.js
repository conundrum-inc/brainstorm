function menuVisible(state = false, action) {
  switch (action.type) {
    case 'SHOW_MENU':
      console.log("Showing Menu");
      return true; //if this doesn't work, try {...state, isMenuVisible: true}
    case 'HIDE_MENU':
      console.log('Hiding Menu');
      return false; //if this doesn't work, try {...state, isMenuVisible: false}
    default:
      return state;
  }
  return state;
}

export default menuVisible;
