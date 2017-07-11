function viewMenu(state = {isMenuVisible: false}, action) {
  switch (action.type) {
    case 'SHOW_MENU':
      console.log("Showing Menu");
      return {isMenuVisible: true}; //if this doesn't work, try {...state, isMenuVisible: true}
    case 'HIDE_MENU':
      console.log('Hiding Menu');
      return {isMenuVisible: false}; //if this doesn't work, try {...state, isMenuVisible: false}
    default:
      return state;
  }
  return state;
}

export default viewMenu;
