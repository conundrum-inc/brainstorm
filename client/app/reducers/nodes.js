function nodes(state=[{key: 0, size: 40}], action) {
  switch(action.type) {
    case 'ADD_NODE':
    console.log('Updating state, node added');
      return [...state, action.node]

    default:
      return state
  }
  return state
}

export default nodes;
