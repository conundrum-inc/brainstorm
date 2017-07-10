import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import comments from './comments';
import detailViewVisible from './detailViewVisible';
import menuVisible from './menuVisible';
import user from './user';

const rootReducer = combineReducers({comments, detailViewVisible, menuVisible, user, routing: routerReducer });

export default rootReducer;
