import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import ValidateLogin from '@/components/ValidateLogin';
import store from '@/store/home';
import CmpLayout from './components/Layout';
import ViewIndex from './views/index/index';

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
