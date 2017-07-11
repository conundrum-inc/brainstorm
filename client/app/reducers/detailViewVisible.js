import _.findIndex from 'lodash';

function viewDetail(state = false, action) {
  switch (action.type) {
    case 'SHOW_DETAIL':
      console.log("Showing Detail");
      return //blah
    case 'HIDE_DETAIL':
      console.log('Hiding Detail');
      return []
    default:
      return state; //??
  }
  return state; //??
}


export default viewDetail;
