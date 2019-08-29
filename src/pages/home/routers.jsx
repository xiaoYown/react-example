import React from 'react';
import AsyncComponent from '@/components/AsyncComponent';

const ViewIndex = AsyncComponent(() => import(/* webpackChunkName: "home-view-index" */ './views/index/index'));
const ViewCenter = AsyncComponent(() => import(/* webpackChunkName: "home-view-center" */ './views/center/index'));
const ViewLogin = AsyncComponent(() => import(/* webpackChunkName: "home-view-login" */ '../login/LoginComponent'));

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
