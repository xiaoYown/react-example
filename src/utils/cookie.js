import cookie from 'cookie';

let cookieConfig = {
  path: '/',
  // domain: 'xiaoYown.io',
  maxAge: 295000
};
// export function saveCookie (name, value, config = cookieConfig) {
//   cookie.save(name, value, config);
// }

export function getCookie (name, doNotParse) {
  var cookies = cookie.parse(document.cookie);
  var cookieVal = cookies && cookies[name];

  if (typeof doNotParse === 'undefined') {
    doNotParse = !cookieVal || (cookieVal[0] !== '{' && cookieVal[0] !== '[');
  }
  if (!doNotParse) {
    try {
      cookieVal = JSON.parse(cookieVal);
    } catch (e) {
      // Not serialized object
    }
  }
  return cookieVal;
}

export function saveCookie (name, val) {
  if (typeof val === 'undefined') {
    val = 'undefined';
  } else if (typeof val === 'object') {
    val = JSON.stringify(val);
  } else {
    val += '';
  }
  document.cookie = cookie.serialize(name, val);
}
