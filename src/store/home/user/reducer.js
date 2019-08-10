import * as types from './types';

const defaultState = {
  name: window.sessionStorage.getItem('name'), // 用户名
  age: window.sessionStorage.getItem('age'),
  job: window.sessionStorage.getItem('job'),
  num: 0 // 数量(store 测试)
};
const mutations = {
  [types.MODIFY_INFO] (state, payload) {
    for (const key in payload) {
      window.sessionStorage.setItem(key, payload[key]);
      state[key] = payload[key];
    }
    return state;
  },
  [types.INCREAMENT] (state) {
    state.num += 1;
    return state;
  },
  [types.DECREAMENT] (state) {
    state.num -= 1;
    return state;
  },
  [types.NUM_MODIFY] (state, payload) {
    state.num = payload.num;
    return state;
  }
};
// 首页表单数据
export const user = (state = defaultState, params) => {
  let _state = state;
  if (mutations[params.type]) {
    _state = mutations[params.type](state, { ...params.payload });
  }
  return { ...state, _state };
};
