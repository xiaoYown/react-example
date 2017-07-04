import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { render } from 'react-dom';

import AppCmpt from '../App.jsx';
import homeCmpt from './views/home.jsx';
import reduxCmpt from './views/redux.jsx';
import loginCmpt from './views/login.jsx';
import aboutCmpt from './views/about.jsx';
import IndexnavCmpt from './mixin/nav.jsx';

import { getCookie } from 'tools/client';
import jQuery from 'jquery';

require('sass/base.scss');
require('sass/index.scss');

// global.jQuery = global.$ = jQuery;

class Index extends React.Component {
  // constructor (props) {
  //   super(props);
  // }
  // 1.创建阶段( getDefaultProps )
  // getDefaultProps() {
  //   console.log("getDefaultProps");
  //   return {};
  // }
  // 2.实例化阶段
  // getInitialState() {
  //   console.log("getInitialState");
  //   return {};
  // }

  // render之前调用，业务逻辑都应该放在这里，如对state的操作等
  componentWillMount () {
  }
  // 渲染并返回一个虚拟DOM
  render () {
    return (
      <div className="index-wrap">
        <IndexnavCmpt />
        {this.props.children}
      </div>
    );
  }
};

// 权限判断
const requireAuth = (nextState, replace) => {
  if (!getCookie('session')) {
    replace({ pathname: '/login' });
  }
};

const routers = (
  <AppCmpt>
    <Router history={ hashHistory }>
      <Route path="/" component={ Index }>
        <IndexRoute component={ homeCmpt } onEnter={ requireAuth }/>
        <Route path="/login" component={ loginCmpt }/>
        <Route path="/redux" component={ reduxCmpt }/>
        <Route path="/about" component={ aboutCmpt } onEnter={ requireAuth }/>
      </Route>
    </Router>
  </AppCmpt>
);

render(
  routers,
  document.getElementById('page_index')
);
