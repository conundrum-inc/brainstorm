function detailViewVisible(state = false, action) {
  switch (action.type) {
    case 'SHOW_DETAIL':
      console.log("Showing Detail");
      return true; //if this doesn't work, try {...state, isDetailVisible: true}
    case 'HIDE_DETAIL':
      console.log('Hiding Detail');
      return false; //if this doesn't work, try {...state, isDetailVisible: false}
    default:
      return state;
  }
  return state;
}

export default detailViewVisible;
