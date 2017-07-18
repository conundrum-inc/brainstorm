import _ from 'lodash'

function nodes(state=[{key: 0, size: 40}], action) {
  switch(action.type) {
    case 'ADD_NODE':
      console.log('Updating state, node added');
      return [...state, action.node]
    case 'UPDATE_NODE':
      console.log('updating node with key: ', action.node.key)
      console.log('current nodes: ', state)
      var nodeIndex = _.findIndex(state, ['key', action.node.key])
      console.log('matches node at position: ', nodeIndex)
      return [
        ...state.slice(0, nodeIndex),
        action.node,
        ...state.slice(nodeIndex + 1)
      ]
    default:
      return state
  }
  return state
}

export default nodes;
