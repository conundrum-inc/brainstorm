import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import comments from './comments';
import detailViewVisible from './detailViewVisible';
import createSessionVisible from './createSessionVisible';
import menuVisible from './menuVisible';
import nodes from './nodes';
import links from './links';
import user from './user';
import session from './session';
import currentNode from './currentNode';
// import user from './user';

const rootReducer = combineReducers({comments, detailViewVisible, createSessionVisible, menuVisible, nodes, links, user, session, currentNode, routing: routerReducer });

export default rootReducer;
