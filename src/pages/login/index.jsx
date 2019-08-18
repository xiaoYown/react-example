import React from 'react';
import { render } from 'react-dom';
import WrapperLogin from './LoginComponent';
import '@/assets/sass/login/main.scss';

render(
  <WrapperLogin/ >,
  document.getElementById('g-login')
);

if (module.hot) {
  module.hot.accept();
}
