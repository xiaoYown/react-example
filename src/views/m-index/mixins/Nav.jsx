import React, { Component } from 'react';
import { BrowserRouter as Link, NavLink } from 'react-router-dom';

// @import '@/assets/sass/index/mixins/nav.scss';

class nav extends Component {
  render () {
    return (
      <div className="m-navSpace">
        <nav className="m-nav">
          <NavLink activeClassName="s-active" exact to="/m/mine">
            <div className="m-navItem">我的简报</div>
          </NavLink>
          <NavLink activeClassName="s-active" to="/m/mine/team">
            <div className="m-navItem">我的团队</div>
          </NavLink>
          <NavLink activeClassName="s-active" to="/m/mine/message">
            <div className="m-navItem">消息</div>
          </NavLink>
          <NavLink activeClassName="s-active" to="/m/mine/center">
            <div className="m-navItem">个人中心</div>
          </NavLink>
        </nav>
      </div>
    );
  }
};

export default nav;
