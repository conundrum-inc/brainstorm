function inviteDetailVisible(state = false, action) {
  switch (action.type) {
    case 'SHOW_INVITE_DETAIL':
      return true;
    case 'HIDE_INVITE_DETAIL':
      return false;
    default:
      return state;
  }
  return state;
}

export default inviteDetailVisible;
