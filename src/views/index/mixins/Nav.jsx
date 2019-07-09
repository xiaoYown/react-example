import React, { Component } from 'react';
import { BrowserRouter as Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import config from 'config/config';

// @import '@/assets/sass/index/mixins/nav.scss';

class nav extends Component {
  setNavs = () => {
    var pathname = window.location.pathname;
    var navList = [];
    var teamId = window.sessionStorage.getItem('m_team_id');
    // 不需要导航的页面
    if (/(^\/m\/myteam\/team\/share\/|^\/m\/index\/library)/.test(pathname)) {
      navList = [];
    } else if (/^\/m\/myteam\//.test(pathname)) {
      navList = [{
        name: '团队列表',
        icon: 'icon-yidong-tuanduiliebiao',
        path: `/m/index/myteam`,
        active: /^\/m\/index\/myteam/.test(pathname)
      }, {
        name: '团队空间',
        icon: 'icon-yidong-tuanduikongjian',
        path: `/m/myteam/team/${teamId}`,
        active: `/m/myteam/team/${teamId}` === pathname || /m\/myteam\/team\/.*\/folder\/.*/.test(pathname)
      }, {
        name: '动态',
        icon: 'icon-yidong-dongtai',
        path: `/m/myteam/team/dynamic/${teamId}`,
        active: /^\/m\/myteam\/team\/dynamic\//.test(pathname)
      }, {
        name: '成员',
        icon: 'icon-yidong-chengyuan',
        path: `/m/myteam/team/member/${teamId}`,
        active: /^\/m\/myteam\/team\/member\//.test(pathname)
      }];
    } else {
      navList = [{
        name: '我的简报',
        icon: 'icon-m-report',
        path: '/m/index/myreport',
        active: /^\/m\/index\/myreport/.test(pathname)
      }, {
        name: '我的团队',
        icon: 'icon-m-team',
        path: '/m/index/myteam',
        active: /^\/m\/index\/myteam/.test(pathname)
      }];
      if (/(banber|private_cloud)/.test(config.custom)) {
        navList = navList.concat([{
          name: '个人中心',
          icon: 'icon-m-center',
          path: '/m/index/center',
          active: /^\/m\/index\/center/.test(pathname)
        }]);
      } else {
        navList = navList.concat([{
          name: '消息',
          icon: 'icon-m-message',
          path: '/m/index/message',
          active: /^\/m\/index\/message/.test(pathname)
        }, {
          name: '个人中心',
          icon: 'icon-m-center',
          path: '/m/index/center',
          active: /^\/m\/index\/center/.test(pathname)
        }]);
      }
    }
    return navList;
  }
  trigger (nav) {
    var pathReg = window.location.pathname.split('/').slice(0, 3).join('/');
    var navReg = nav.path.split('/').slice(0, 3).join('/');
    // 如果是同页面下用push方式，不同页面下用href方式
    if (pathReg === navReg) {
      this.props.history.push(nav.path);
    } else {
      window.location.href = `${nav.path}`;
    }
  }
  _isRender () {
    if (/m\/myteam\/team\/member\/.*\/.*/.test(window.location.pathname)) {
      return null;
    } else {
      const navList = this.setNavs().map((nav) =>
        <div className={ ['m-navItem', nav.active ? 's-active' : ''].join(' ') } key={ nav.name } onClick={ this.trigger.bind(this, nav) }>
          <i className={ ['iconfont', 'font-40', nav.icon].join(' ') }></i>
          <p>
            { nav.name }
          </p>
        </div>
      );
      return (
        <div className="m-navSpace">
          <nav className="m-nav">
            { navList }
          </nav>
        </div>
      );
    }
  }
  render () {
    return (
      <div>{ this._isRender() }</div>
    );
  }
};

export default withRouter(nav);
