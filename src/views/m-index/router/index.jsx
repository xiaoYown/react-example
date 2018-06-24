import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import store from '@/store/index/store';

import AppCmpt from '../../App';
import NavCmpt from '../mixins/Nav';

import PageMyReport from '../p-MyReport/MyReport';
import PageMyTeam from '../p-MyTeam/MyTeam';
import PageMessage from '../p-Message/Message';
import PageCenter from '../p-Center/Center';

class Index extends React.Component {
  render () {
    return (
      <div>
        <Provider store={ store }>
          <div>
            {this.props.children}
            <NavCmpt />
          </div>
        </Provider>
      </div>
    );
  }
};

const routers = (
  <Router>
    <AppCmpt>
      <Index>
        <Route exact path="/m/mine" component={ PageMyReport }/>
        <Route path="/m/mine/team" component={ PageMyTeam }/>
        <Route path="/m/mine/message" component={ PageMessage }/>
        <Route path="/m/mine/center" component={ PageCenter }/>
      </Index>
    </AppCmpt>
  </Router>
);

export default routers;
