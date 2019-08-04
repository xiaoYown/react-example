import 'react';
import { render } from 'react-dom';
import routers from './routers';

render(
  routers,
  document.getElementById('g-root')
);

if (module.hot) {
  module.hot.accept();
}
