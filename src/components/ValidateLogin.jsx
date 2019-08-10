import React from 'react';
import { isLogin, login } from '@/utils';

class ValidateLogin extends React.Component {
  render () {
    const isLoginPage = window.location.pathname === '/login';
    if (isLogin() || isLoginPage) {
      return this.props.children;
    } else {
      login();
      return '';
    }
  }
}

export default ValidateLogin;
