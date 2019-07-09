import config from 'config/config';

// 1. 联系人列表相关 API

// 获取我的联系人列表 API
export const GetReport = {
  URL: config.apiUrl + '/folder/show/' // 1/40?folderId=<folderId>
};
