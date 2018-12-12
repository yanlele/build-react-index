/**
 * create by yanle
 * create time 2018/12/11 下午4:29
 */

import {createStore, applyMiddleware} from 'redux';
import thunkMidWare from 'redux-thunk';

import combineReducers from './reduceres';

let store = createStore(combineReducers, applyMiddleware(thunkMidWare));

export default store;