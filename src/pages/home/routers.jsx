import React from 'react';
import AsyncComponent from '@/components/AsyncComponent';

const ViewIndex = AsyncComponent((resolve) => {
  require.ensure([], () => {
    resolve(require('./views/index/index'));
  }, 'home-view-index');
});
const ViewCenter = AsyncComponent((resolve) => {
  require.ensure([], () => {
    resolve(require('./views/center/index'));
  }, 'home-view-center');
});
const ViewLogin = AsyncComponent((resolve) => {
  require.ensure([], () => {
    resolve(require('../login/LoginComponent'));
  }, 'home-view-login');
});

const routers = [{
  path: '/react/home',
  component: ViewIndex,
  exact: true,
  hasWrapper: true, // 是否有 side + header
  login: true, // 是否需要验证登录
  loginOther: true // 登录是否需要跳转其他页面
}, {
  path: '/react/home/center',
  component: ViewCenter,
  exact: true,
  hasWrapper: true,
  login: true,
  loginOther: true
}, {
  path: '/react/home/no_login',
  component: () => <div>This page do not need login.</div>,
  exact: true,
  hasWrapper: true
}, {
  path: '/react/home/no_wrapper',
  component: () => <div>This page without wrapper and do not need login.</div>,
  exact: true
}, {
  path: '/react/home/login',
  component: ViewLogin,
  exact: true
}];

export default routers;
