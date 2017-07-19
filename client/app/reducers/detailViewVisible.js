function detailViewVisible(state = false, action) {
  switch (action.type) {
    case 'SHOW_DETAIL':
      return true;
    case 'HIDE_DETAIL':
      return false;
    default:
      return state;
  }
  return state;
}

export default detailViewVisible;
