import React from 'react';
import { render } from 'react-dom';
import '@/assets/sass/index/main.scss';

class LoginCmp extends React.Component {
  render () {
    return (
      <div>登录</div>
    );
  }
};

const Login = (
  <div>
    <LoginCmp />
  </div>
);

render(
  Login,
  document.getElementById('page_login')
);
