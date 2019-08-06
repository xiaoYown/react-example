import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/store/home';
import ViewIndex from './views/index/index';
import CmpLayout from './components/Layout';

class StoreWrapper extends React.Component {
  constructor () {
    super();
    this.state = {
      navs: []
    };
  }

  render () {
    return (
      <Provider store={ store }>
        <div>
          <CmpLayout>
            { this.props.children }
          </CmpLayout>
        </div>
      </Provider>
    );
  }
};

const routers = (
  <Router>
    <StoreWrapper>
      <Route path="/" component={ ViewIndex }/>
    </StoreWrapper>
  </Router>
);

export default routers;
