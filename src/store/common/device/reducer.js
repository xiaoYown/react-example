import { getBrowser } from '@/utils/device/browser';

const UA = window.navigator.userAgent;

let defaultState = {
  os: 'others', // 默认安卓
  isWechat: /MicroMessenger/.test(UA),
  isQQ: /\sQQ/.test(UA),
  isMobile: /AppleWebKit.*Mobile.*/.test(UA),
  browser: getBrowser()
};

const mutations = {};

export const device = (state = defaultState, params) => {
  let _state = state;
  if (mutations[params.type]) {
    _state = mutations[params.type](state, {...params.payload});
  }
  return {...state, _state};
};
