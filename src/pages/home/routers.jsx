import React from 'react';
import AsyncComponent from '@/components/AsyncComponent';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import ValidateLogin from '@/components/ValidateLogin';
import store from '@/store/home';

const ViewIndex = AsyncComponent((resolve) => {
  require.ensure([], () => {
    resolve(require('./views/index/index'));
  }, 'home-view-index');
});
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
      <div>
        <CmpLayout>
          { this.props.children }
        </CmpLayout>
      </div>
    </Provider>;
  }
};

const routers = (
  <ValidateLogin>
    <Router>
      <StoreWrapper>
        <Route exact path="/home" component={ ViewIndex }/>
      </StoreWrapper>
    </Router>
  </ValidateLogin>
);

export default routers;
