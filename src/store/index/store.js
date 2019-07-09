import {createStore, combineReducers, applyMiddleware} from 'redux';
import * as device from '@/store/common/device/reducer';
import thunk from 'redux-thunk';

let store = createStore(
  combineReducers({...device}), // reducer 合并
  applyMiddleware(thunk)
);

export default store;
