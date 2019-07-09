import config from 'config/config';

// 1. 列表相关 API

// 获取首页简报集列表 API
export const GetMessageList = {
  URL: config.apiUrl + '/message' // limit=10&offset=1&type=system
};

// 2. 操作相关 API

// 权限同意查看API
export const AllowViweReport = {
  URL: config.apiUrl + '/report/apply_pass'
};
// 权限拒绝查看API
export const RejectViweReport = {
  URL: config.apiUrl + '/report/apply_no_pass'
};
// post - 审核用户加入团队
export const AddTeamAudit = {
  URL: config.apiUrl + '/team/manage_apply'
};
