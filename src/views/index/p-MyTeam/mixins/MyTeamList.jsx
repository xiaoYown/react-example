import React, { Component } from 'react';

import store from '@/store/index/store';

import axios from 'axios';
import { httpResponse } from '@/utils/utils';
import { GetMyTeamsList } from '@/assets/js/interface/myTeam.js';
import { withRouter } from 'react-router';

class MyTeam extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }
  toDetail (teamInfo) {
    // var pathReg = window.location.pathname.split('/').slice(0, 3).join('/');
    // var navReg = '/m/myteam';
    // console.log(pathReg === navReg);
    // 如果是同页面下用push方式，不同页面下用href方式
    // if (pathReg === navReg) {
    //   this.props.history.push(`/m/myteam/team/${teamInfo.team_id}`);
    // } else {
    // }
    window.location.href = `/m/myteam/team/${teamInfo.team_id}`;
    window.sessionStorage.setItem('m_team_id', teamInfo.team_id);
  }
  render () {
    const myTeamList = this.props.myTeamList.map((list) =>
      <li className="p-myTeamItem" key={ list.team_id } onClick={ this.toDetail.bind(this, list) }>
        <img className="myTeam-img" src={ list.cover_url || '/m/static/images/team.png' } alt=""/>
        <div className="myTeam-content">
          <p className="txt title font-24">{ list.name }</p>
          <p className="txt desc font-22">{ list.describe || '无团队描述'}</p>
        </div>
      </li>
    );
    return (
      <ul className="p-myTeamList">
        { myTeamList }
      </ul>
    );
  }
};

export default withRouter(MyTeam);
