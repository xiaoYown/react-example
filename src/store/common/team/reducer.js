import * as types from './types';

let defaultState = {
  teamInfoStatus: 0, // 团队信息获取状态(0: 未获取, 1: 成功, -1: 失败)
  teamInfo: {
    cover_url: '',
    describe: '',
    name: '',
    role: 0,
    team_id: ''
  }
};

const mutations = {
  [types.SAVE_TEAM_INFO] (state, payload) { // 保存用户信息
    if (payload.status === 1) {
      state.teamInfo.teamInfoStatus = 1;
      state.teamInfo.cover_url = payload.cover_url;
      state.teamInfo.describe = payload.describe;
      state.teamInfo.name = payload.name;
      state.teamInfo.role = payload.role;
      state.teamInfo.team_id = payload.team_id;
    } else {
      state.teamInfo.teamInfoStatus = payload.status;
    }
  }
};

export const team = (state = defaultState, params) => {
  let _state = state;
  if (mutations[params.type]) {
    _state = mutations[params.type](state, { ...params.payload
    });
  }
  return { ...state, _state };
};
