import Axios from 'axios';
import * as types from './types';
import * as API from '@/assets/js/interface/myTeam';
// 保存用户信息
export function saveTeamInfo (teamId) {
  return dispatch => {
    Axios.get(`${API.GetTeamInfo.URL}?team_id=${teamId}`).then(res => {
      let body = res.data;
      if (body.code === 0) {
        dispatch({
          type: types.SAVE_TEAM_INFO,
          payload: { ...body.data, status: 1 }
        });
      } else {
        dispatch({
          type: types.SAVE_TEAM_INFO,
          payload: { status: -1 }
        });
      };
    }).catch(() => {
      dispatch({
        type: types.SAVE_TEAM_INFO,
        payload: { status: -1 }
      });
    });
  };
}
