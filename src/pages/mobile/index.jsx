import 'react';
import { render } from 'react-dom';
import routers from './routers';

import '@/assets/js/adapt/device';
import '@/assets/js/adapt/rem';
import '@/assets/sass/mobile/main.scss';

render(
  routers,
  document.getElementById('g-mobile')
);

if (module.hot) {
  module.hot.accept();
}
