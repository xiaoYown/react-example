import React, { Component } from 'react';

import axios from 'axios';
import { httpResponse } from '@/utils/utils';
import { GetPublicList } from '@/assets/js/interface/library.js';

import ScrollLoad from '@/components/scroll/ScrollLoad';
import Loading from '@/components/loading/Loading.jsx';
import LoadFail from '@/views/index/mixins/LoadFail.jsx';

/**
 * @description 图表对象本体
 */

class Library extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      count: -1, // 未初始化时, 数量为 -1
      pages: { // 页面信息
        offset: 1,
        limit: 25
      },
      canRequest: true, // 是否后面还有数据继续请求
      isAppending: false, // 是否正在添加
      reportList: [], // 简报数据列表
      loadingTxt: '正在获取简报', // loading 状态中的文字提示
      failTip: { // 加载失败提示
        image: '/m/static/images/not-report.png',
        text: '简报加载失败',
        showBack: true
      },
      notData: { // 没有数据提示
        image: '/m/static/images/not-report.png',
        text: '暂无简报'
      },
      loadFail: false, // 加载失败
      scrollTextStatus: 0 // 滚动完成状态
    };
  }
  componentDidMount () {
    document.title = '简报库';
    // 先获取我的团队列表
    this.getReportList();
  }
  componentWillUnmount () {
    this._isMounted = false;
  }
  getReportList () { // 先获取我的团队列表
    if (!this.state.canRequest) return;
    if (this.state.isAppending) return;
    this.setState({
      isAppending: true,
      scrollTextStatus: this.state.pages.offset === 1 ? -1 : 0
    });
    this._isMounted = true;
    let request = axios.get(`${GetPublicList.URL}/${this.state.pages.offset}/${this.state.pages.limit}`);
    httpResponse(request, this.reportListSuccess, this.reportList);
  }
  reportListSuccess = (res) => { // 获取我的团队成功回调
    if (this._isMounted) {
      let count = res.data.data.total;
      this.setState({
        loadFail: false,
        isAppending: false,
        scrollTextStatus: count > 0 ? 2 : -1,
        count: count,
        reportList: this.state.reportList.concat(res.data.data.reportList)
      });
      if (this.state.reportList.length >= this.state.count) {
        this.setState({
          canRequest: false
        });
      }
    }
  }
  reportList = (res) => { // 获取我的团队失败回调
    this.setState({
      loadFail: true,
      scrollTextStatus: -1,
      isAppending: false
    });
    console.log(res);
  }
  reachEnd () { // 是否滚动加载
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
    this.getReportList();
  }
  render () {
    // 如果是首次加载
    let showLoading;
    let showFail;
    if (this.state.pages.offset === 1 && this.state.isAppending) {
      showLoading = <Loading title={ this.state.loadingTxt }/>;
    }
    // 无数据请求失败,显示加载失败页面
    if (this.state.loadFail) {
      showFail = <LoadFail item={ this.state.failTip } />;
    } else if (this.state.count === 0) {
      showFail = <LoadFail item={ this.state.notData } />;
    }
    return (
      <section className="g-library">
        <div className="g-library-header">
          <span className="g-library-logo"></span>
        </div>
        { showLoading }
        { showFail }
        <ScrollLoad
          beforeDistance={ 100 }
          reachEnd={ this.reachEnd.bind(this) }
          status={ this.state.scrollTextStatus }>
          <div className="g-library-body">
            <ul className="g-library-item-ul">
              {
                this.state.reportList.map(item => {
                  return (
                    <li className="g-library-item-li" key={item.reportGatherId}>
                      <div className="g-library-item">
                        <div className="g-library-item-cover" style={{ backgroundImage: `url(${item.imgUrl})` }}></div>
                        <div className="g-library-item-title">{item.title || '无标题'}</div>
                        <div className="g-library-item-info">
                          <div className="icon-box">
                            <i className="iconfont icon-chakan"></i>
                            <span>{item.clickNum}</span>
                          </div>
                          <div className="icon-box">
                            <i className="iconfont icon-dianzan"></i>
                            <span>{item.useCount}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })
              }
            </ul>
          </div>
        </ScrollLoad>
      </section>
    );
  }
};

export default Library;
