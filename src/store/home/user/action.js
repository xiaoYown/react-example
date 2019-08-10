import * as types from './types';

// 增加
export const modifyInfo = payload => {
  return {
    type: types.MODIFY_INFO,
    payload
  };
};
// 增加
export const increament = payload => {
  return {
    type: types.INCREAMENT,
    payload
  };
};
// 减少
export const decreament = payload => {
  return {
    type: types.DECREAMENT,
    payload
  };
};
// 定义
export const numModify = payload => {
  return {
    type: types.NUM_MODIFY,
    payload
  };
};
