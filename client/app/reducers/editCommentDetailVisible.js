function editCommentDetailVisible(state = false, action) {
  switch (action.type) {
    case 'SHOW_EDIT_COMMENT_DETAIL':
      return true;
    case 'HIDE_EDIT_COMMENT_DETAIL':
      return false;
    default:
      return state;
  }
  return state;
}

export default editCommentDetailVisible;
