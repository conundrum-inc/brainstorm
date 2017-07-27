function currentNode(state={}, action) {
  switch (action.type) {
    case 'SET_NODE':
      // console.log('updating state, setting current node')
      return action.node
    default:
      return state
  }
  return state
}

export default currentNode
