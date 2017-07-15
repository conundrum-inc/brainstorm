import { createStore, compose, applyMiddleware } from 'redux';
// import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import { loadState, saveState } from './localStorage'

// import the root reducer
import rootReducer from './reducers/index';

// below is dummy data that was rendered from data files in the tutorial
// this can maybe be useful if we need to render a default state from database data????

// import comments from './data/comments';
// import menuVisible from './data/menuVisible';
// import detailViewVisible from './data/detailViewVisible';
// import posts from './data/user';

// create an object for the default data
// const defaultState = {
//   // session,
//   comments,
//   menuVisible,
//   detailViewVisible
// };

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
  saveState({
    user: store.getState().user,
    comments: store.getState().comments
  });
});

// export const history = syncHistoryWithStore(browserHistory, store);

if(module.hot) {
  module.hot.accept('./reducers',() => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
