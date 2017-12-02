function currentNode(state={}, action) {
  switch (action.type) {
    case 'SET_NODE':
      
      return action.node
    default:
      return state
  }
  return state
}

export default currentNode
