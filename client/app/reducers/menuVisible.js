function viewMenu(state = {isMenuVisible: false}, action) {
  switch (action.type) {
    case 'SHOW_DETAIL':
      console.log("Showing Detail");
      return {isMenuVisible: true}; //if this doesn't work, try {...state, isMenuVisible: true}
    case 'HIDE_DETAIL':
      console.log('Hiding Detail');
      return {isMenuVisible: false}; //if this doesn't work, try {...state, isMenuVisible: false}
    default:
      return state;
  }
  return state;
}

export default viewMenu;
