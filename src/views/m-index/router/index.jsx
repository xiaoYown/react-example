import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import AppCmpt from '../../App';
import NavCmpt from '../mixins/Nav';

import PageMyReport from '../p-MyReport/MyReport';
import PageMyTeam from '../p-MyTeam/MyTeam';
import PageMessage from '../p-Message/Message';
import PageCenter from '../p-Center/Center';

class Index extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: 'index wrap',
      num: 0
    };
  }
  static defaultProps = {
    name: 'index'
  }
  render () {
    return (
      <div>
        {this.props.children}
        <NavCmpt />
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
