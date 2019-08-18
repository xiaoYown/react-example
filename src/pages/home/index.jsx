import React from 'react';
import { render } from 'react-dom';
import RoutersWrapper from './routers-wrapper';

import '@/assets/sass/home/main.scss';

render(
  <RoutersWrapper />,
  document.getElementById('g-home')
);

if (module.hot) {
  module.hot.accept();
}
