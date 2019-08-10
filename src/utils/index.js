// 路径 query 部分解析
export function parseQuery (query = window.location.search) {
  const res = {};
  query = query.trim().replace(/^(\?|#|&)/, '');
  if (!query) {
    return res;
  }
  query.split('&').forEach(function (param) {
    const parts = param.replace(/\+/g, ' ').split('=');
    const key = decodeURIComponent(parts.shift());
    const val = parts.length > 0
      ? decodeURIComponent(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });
  return res;
}
/**
 * 重定向
 * @param {String} key - 必须, search 部分的 key (must)
 * @param {String} defaultUrl - 回跳参数不存在, 默认链接 (not must)
 * @param {String} method - 可选: replace (not must)
 */
// 页面回跳
export function redirectQuery (key, defaultUrl, method) {
  let url = parseQuery(window.location.search)[key];
  if (!url) {
    url = defaultUrl || '/';
  }
  if (method === 'replace') {
    window.location.replace(url);
  } else {
    window.location.href = url;
  }
}
// 登录状态判断
export function isLogin () {
  return !!window.sessionStorage.getItem('name');
}
// 登录
export function login (_backUrl) {
  const backUrl = encodeURIComponent(_backUrl || window.location.href);
  window.location.replace(`/login?back_url=${backUrl}`);
}
// 登出
export function logout () {
  window.sessionStorage.removeItem('name');
  window.location.replace('/login');
}
