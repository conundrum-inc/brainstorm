import _ from 'lodash'

function nodes(state=[{key: 0, size: 40}], action) {
  switch(action.type) {
    case 'ADD_NODE':
      
      return [...state, action.node]
    case 'UPDATE_NODE':
      
      var nodeIndex = _.findIndex(state, ['key', action.node.key])
      
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
