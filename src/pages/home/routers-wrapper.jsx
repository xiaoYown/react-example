import React from 'react';
import AsyncComponent from '@/components/AsyncComponent';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import ValidateRoute from '@/components/ValidateRoute';
import store from '@/store/home';
import routers from './routers';

const CmpLayout = AsyncComponent((resolve) => {
  require.ensure([], () => {
    resolve(require('./components/Layout'));
  }, 'layout');
});

class StoreWrapper extends React.Component {
  constructor () {
    super();
    this.state = {
      navs: []
    };
  }

  render () {
    return <Provider store={ store }>
      { this.props.hasWrapper ? <CmpLayout>{ this.props.children }</CmpLayout> : this.props.children }
    </Provider>;
  }
};

class RoutersWrapper extends React.Component {
  render () {
    return <Router>
      <div>
        {
          routers.map((item, index) => {
            return <ValidateRoute key={index} {...item} wrapper={StoreWrapper}/>;
          })
        }
      </div>
    </Router>;
  }
};

export default RoutersWrapper;
