export function getBrowser () {
  let UA = navigator.userAgent; // 取得浏览器的 userAgent
  if (UA.indexOf('workplus') > -1) {
    return 'iwork';
  } else if (/wxwork.*MicroMessenger/.test(UA)) {
    return 'wxwork';
  } else if (UA.indexOf('Opera') > -1) {
    return 'Opera';
  } else if (UA.indexOf('Firefox') > -1) {
    return 'Firefox';
  } else if (/Edge/.test(UA)) {
    return 'Edge';
  } else if (UA.indexOf('Chrome') > -1) {
    return 'Chrome';
  } else if (UA.indexOf('Safari') > -1) {
    return 'Safari';
  } else if (/Trident.*rv:11\.0/.test(UA)) {
    return 'IE 11';
  } else if (/MSIE (\d+)\./.test(UA)) {
    return 'IE ' + UA.match(/MSIE (\d+)\./)[1];
  } else {
    return 'others';
  }
}
