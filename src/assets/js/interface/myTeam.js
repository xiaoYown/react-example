import config from 'config/config';

// 1. 联系人列表相关 API

// 获取我的团队列表 API
export const GetTeam = {
  URL: config.apiUrl + '/team/get/list' // 1/40?folderId=<folderId>
};
// 获取我的团队中某个团队的文件 API
export const GetTeamFolder = {
  URL: config.apiUrl + '/team/show/' // <team_id>/<folder_id>/<offset>/<limit>
};
// 获取我的团队的团队动态
export const GetTeamDynamic = {
  URL: config.apiUrl + '/team/get_team_dynamic' // <teamId><offset>/<limit>
};
// 获取团队列表 API
export const GetMyTeamsList = {
  URL: config.apiUrl + '/team/get/list'
};
// 获取成员列表 API
export const GetMemberList = {
  URL: config.apiUrl + '/team/get/member'
};
// 获取团队分享的token
export const PostTeamShareToken = {
  URL: config.apiUrl + '/team/share' // { teamId }
};
// 根据用户id获取用户信息
export const GetTeamUserInfo = {
  URL: config.apiUrl + '/team/get/member/info' // user_id
};
// 移除成员
export const PostTeamDeleteMember = {
  URL: config.apiUrl + '/team/delete/member' // { team_id, delete_user_id }
};
// 删除分组
export const PostTeamDeleteGroup = {
  URL: config.apiUrl + '/team/delete/group' // { team_id, team_group_id }
};
// 获取企业组成员
export const GetTeamTeamGroupMember = {
  URL: config.apiUrl + '/team/get_company_user_list/' // <group_id>/<int:offset>/<int:limit>
};
// 根据团队ID获取团队信息接口
export const GetTeamInfo = {
  URL: config.apiUrl + '/team/get/info' // <group_id>/<int:offset>/<int:limit>
};
// 根据token获取团队信息
export const GetTeamShareJoin = {
  URL: config.apiUrl + '/team/share_click' // <token>
};
// post - 申请加入团队
export const ApplyJoinTeam = {
  URL: config.apiUrl + '/team/user_add_team' // team_id
};
