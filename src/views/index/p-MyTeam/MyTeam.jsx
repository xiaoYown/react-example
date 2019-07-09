import React, { Component } from 'react';

import axios from 'axios';
import { httpResponse } from '@/utils/utils';
import { GetMyTeamsList } from '@/assets/js/interface/myTeam.js';

import MyTeamList from './mixins/MyTeamList';

import ScrollLoad from '@/components/scroll/ScrollLoad';
import Loading from '@/components/loading/Loading.jsx';
import LoadFail from '@/views/index/mixins/LoadFail.jsx';
import NotData from '@/views/index/mixins/NotData.jsx';

class MyTeam extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      count: -1, // 未初始化时, 数量为 -1
      pages: {
        offset: 1,
        limit: 25
      },
      canRequest: true, // 是否后面还有数据继续请求
      isAppending: false,
      myTeamList: [],
      loadingTxt: '团队在来寻找您的路上,客官请稍等(✪ω✪)',
      failTip: {
        image: '/m/static/images/not-contact.png',
        text: '团队加载失败了,一二三四再来一次⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄',
        showBack: true
      },
      notData: {
        image: '/m/static/images/not-contact.png',
        text: '没有加入任何团队'
      },
      loadFail: false,
      scrollTextStatus: 0 // 滚动完成状态
    };
  }
  componentDidMount () {
    document.title = '我的团队';
    // 先获取我的团队列表
    this.getMyTeamsList();
  }
  componentWillUnmount () {
    this._isMounted = false;
  }
  // 先获取我的团队列表
  getMyTeamsList () {
    if (!this.state.canRequest) return;
    if (this.state.isAppending) return;
    this.setState({
      isAppending: true,
      scrollTextStatus: this.state.pages.offset === 1 ? -1 : 0
    });
    this._isMounted = true;
    var request = axios.get(`${GetMyTeamsList.URL}?offset=${this.state.pages.offset}&limit=${this.state.pages.limit}`);
    httpResponse(request, this.myTeamsListSuccess, this.myTeamsListFail);
  }
  // 获取我的团队成功回调
  myTeamsListSuccess = (res) => {
    if (this._isMounted) {
      let count = res.data.data.count;
      this.setState({
        loadFail: false,
        isAppending: false,
        scrollTextStatus: count > 0 ? 2 : -1,
        count: count,
        myTeamList: this.state.myTeamList.concat(res.data.data.data)
      });
      if (this.state.myTeamList.length >= this.state.count) {
        this.setState({
          canRequest: false
        });
      }
    }
  }
  // 获取我的团队失败回调
  myTeamsListFail = (res) => {
    this.setState({
      loadFail: true,
      scrollTextStatus: -1,
      isAppending: false
    });
    console.log(res);
  }
  // 是否滚动加载
  reachEnd () {
    if (this.state.isAppending) {
      return;
    }
    this.setState({
      pages: {
        offset: this.state.pages.offset + 1,
        limit: 25
      }
    });
    // 加载下一页
    this.getMyTeamsList();
  }
  render () {
    // 如果是首次加载
    var showLoading;
    var showFail;
    if (this.state.pages.offset === 1 && this.state.isAppending) {
      showLoading = <Loading title={ this.state.loadingTxt }/>;
    }
    // 无数据请求失败,显示加载失败页面
    if (this.state.loadFail) {
      showFail = <LoadFail item={ this.state.failTip } />;
    } else if (this.state.count === 0) {
      showFail = <NotData item={ this.state.notData } />;
    }
    return (
      <section className="g-myTeam">
        { showLoading }
        { showFail }
        <ScrollLoad
          beforeDistance={ 100 }
          reachEnd={ this.reachEnd.bind(this) }
          status={ this.state.scrollTextStatus }
        >
          <MyTeamList myTeamList={ this.state.myTeamList }/>
        </ScrollLoad>
      </section>
    );
  }
};

export default MyTeam;
