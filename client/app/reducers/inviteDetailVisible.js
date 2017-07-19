function inviteDetailVisible(state = false, action) {
  switch (action.type) {
    case 'SHOW_INVITE_DETAIL':
      console.log("Showing Invite Detail");
      return true; //if this doesn't work, try {...state, isDetailVisible: true}
    case 'HIDE_INVITE_DETAIL':
      console.log('Hiding Invite Detail');
      return false; //if this doesn't work, try {...state, isDetailVisible: false}
    default:
      return state;
  }
  return state;
}

export default inviteDetailVisible;
