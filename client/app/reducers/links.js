function links(state = {source: 0, target: 0, key: 0, size: 2}, action) {
  switch (action.type) {
    case 'ADD_LINK':
      console.log('updating state, link added')
        return [...state, action.link]
    default: 
      return state 
  }
  return state
}

export default links 