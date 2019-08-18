import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin, login, getLoginUrl } from '@/utils';

/* eslint-disable */
function ValidateRoute ({ component: Component, ...rest }) {
  const Wrapper = rest.wrapper;

  return <Route
    {...rest}
    render={props => {
      if (isLogin() || !rest.login) { // 已登录
        return <Wrapper hasWrapper={rest.hasWrapper}><Component {...props} /></Wrapper>;
      } else {
        if (rest.loginOther) { // 登录需要跳转
          login();
          return '';
        } else { // 与登录处于同一页面
          setTimeout(() => {
            props.history.push(getLoginUrl(), props.location);
          });
          return '';
          // return <Redirect
          //   to={{
          //     pathname: getLoginUrl(),
          //     state: { from: props.location }
          //   }}
          // />;
        }
      }
    }}
  />;
}

export default ValidateRoute;
