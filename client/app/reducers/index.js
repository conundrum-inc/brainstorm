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
import inviteDetailVisible from './inviteDetailVisible'
// import user from './user';

const rootReducer = combineReducers({comments, detailViewVisible, createSessionVisible, inviteDetailVisible, menuVisible, nodes, links, user, session, currentNode, routing: routerReducer });

export default rootReducer;
