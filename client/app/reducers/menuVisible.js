function menuVisible(state = false, action) {
  switch (action.type) {
    case 'SHOW_MENU':
      console.log("Showing Menu");
      return true;
    case 'HIDE_MENU':
      console.log('Hiding Menu');
      return false;
    default:
      return state;
  }
  return state; 
}

export default menuVisible;
