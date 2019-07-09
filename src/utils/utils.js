// 路径 query 部分解析
export function parseQuery (query = window.location.search) {
  let res = {};
  query = query.trim().replace(/^(\?|#|&)/, '');
  if (!query) {
    return res;
  }
  query.split('&').forEach(function (param) {
    let parts = param.replace(/\+/g, ' ').split('=');
    let key = decodeURIComponent(parts.shift());
    let val = parts.length > 0
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
 * @param {String} key - 必须, search 部分的 key
 * @param {String} defaultUrl - 回跳参数不存在, 使用默认链接
 * @param {String} method - 非必须, 可选: replace
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
// Ajax的简单封装
export function httpResponse (api, success, error) {
  var _this = this;
  api.then(response => {
    success && success(response);
  }).catch(err => {
    error && error(err);
  });
}
// 获取url中指定的字符串
export function getQueryVariable (variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return (false);
};

// 获取query的值
export function getQueryString (name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};

// 格式化后端的时间,格式1999-09-09 09:09:09
export function GMTToStr (time) {
  let date = new Date(time + '+0800');
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) month = '0' + month;
  let day = date.getDate();
  if (day < 10) day = '0' + day;
  let hours = date.getHours();
  if (hours < 10) hours = '0' + hours;
  let minutes = date.getMinutes();
  if (minutes < 10) minutes = '0' + minutes;
  let seconds = date.getSeconds();
  if (seconds < 10) seconds = '0' + seconds;
  // 时间格式1999-09-09 09:09:09
  let Str = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
  return Str;
}
