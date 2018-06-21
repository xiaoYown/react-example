import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import AppCmpt from '../../App.jsx';
import homeCmpt from '../views/home.jsx';
import reduxCmpt from '../views/redux.jsx';
import loginCmpt from '../views/login.jsx';
import aboutCmpt from '../views/about.jsx';
import IndexnavCmpt from '../mixin/nav.jsx';

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
      <div className="index-wrap">
        <IndexnavCmpt />
        {this.props.children}
      </div>
    );
  }
};

const routers = (
  <Router>
    <AppCmpt>
      <Index>
        <Route exact path="/" component={ homeCmpt }/>
        <Route path="/login" component={ loginCmpt }/>
        <Route path="/redux" component={ reduxCmpt }/>
        <Route path="/about" component={ aboutCmpt }/>
      </Index>
    </AppCmpt>
  </Router>
);

export default routers;
