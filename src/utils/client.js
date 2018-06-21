import cookie from 'react-cookie';

let cookieConfig = {
  path: '/',
  // domain: 'xiaoYown.io',
  maxAge: 295000
};
export function saveCookie (name, value, config = cookieConfig) {
  cookie.save(name, value, config);
}

export function getCookie (name) {
  return cookie.load(name);
}

export function removeCookie (name, config = cookieConfig) {
  cookie.remove(name, config);
}
export function removeCookieAll () {
  Object.keys(cookie.select(/^session.*/i)).forEach(name => cookie.remove(name, cookieConfig));
}
export function signOut (config = cookieConfig) {
  cookie.remove('session', config);
}

export function isLogin () {
  return !!cookie.load('SSIONID');
}
