import config from 'config/config';

// 1. 列表相关 API

// 获取首页简报库列表 API
export const GetPublicList = {
  URL: config.apiUrl + '/publiclist' // /<offset>/<limit>
};
