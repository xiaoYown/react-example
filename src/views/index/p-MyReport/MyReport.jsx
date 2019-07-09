import React, { Component } from 'react';
import * as API from '@/assets/js/interface/myReport';
import axios from 'axios';
import ScrollLoad from '@/components/scroll/ScrollLoad';

import MyReportFolder from './mixins/MyReportFolder.jsx';
import MyReportFile from './mixins/MyReportFile.jsx';
import Loading from '@/components/loading/Loading.jsx';
import Fallback from './mixins/Fallback.jsx';
import NotData from '@/views/index/mixins/NotData.jsx';
import LoadFail from '@/views/index/mixins/LoadFail.jsx';

function ShowComponent (props) {
  if (!props.state.folderList.length && !props.state.reportList.length) {
    // 无数据
    if (props.state.requestOver === 0) {
      // 无数据还在请求中,显示加载
      return <Loading title={ props.state.loadingTxt }/>;
    } else if (props.state.requestOver === 1) {
      // 无数据请求失败,显示加载失败页面
      return <LoadFail item={props.state.failTip} />;
    } else if (props.state.requestOver === 2) {
      // 无数据还在请求成功,显示无数据
      return <NotData item={props.state.notData} />;
    }
  } else {
    // 有数据,显示列表
    return (
      <div>
        <MyReportFolder items={props.state.folderList} />
        <MyReportFile items={props.state.reportList} />
      </div>
    );
  }
}

const CancelToken = axios.CancelToken;

class MyReport extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      // 请求中0/失败1/成功2
      requestOver: 0,
      // 控制滚动条显示字
      scrollTextStatuc: -1,
      folderList: [],
      reportList: [],
      reportTotal: -1, // 简报总数, 未加载为 -1
      isAppending: false, // 是否加载中(不作 state 渲染)
      httpCancel: null, // 请求中断
      page: {
        offset: 1,
        limit: 40
      },
      failTip: {
        image: '/m/static/images/not-report.png',
        text: '简报加载失败了,一二三四再来一次⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄',
        showBack: true
      },
      notData: {
        image: '/m/static/images/not-report.png',
        text: '哎呀,这里暂无简报(⊙o⊙)…'
      },
      loadingTxt: '简报在来寻找您的路上,客官请稍等(✪ω✪)'
    };
  }
  componentDidMount () {
    document.title = '我的简报';
    /*
     * 根据路由进行请求数据
     */
    if (this.props.match.params.id) {
      this.getFolderId(this.props.match.params.id);
    } else {
      this.getFolderId();
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.getFolderId(nextProps.match.params.id);
    }
  }
  componentWillUnmount () {
    if (this.state.httpCancel) {
      this.state.httpCancel();
      this.state.httpCancel = null;
    }
  }
  getFolderId (folderId = '') {
    this.state.page.offset = 1;
    this.setState({
      requestOver: 0,
      folderList: [],
      reportList: []
    });
    this.state.isAppending = true; // request start
    axios.get(`${API.GetReport.URL}${this.state.page.offset}/${this.state.page.limit}?folderId=${folderId}`, {
      cancelToken: new CancelToken(cancel => {
        this.state.httpCancel = cancel;
      })
    }).then(response => {
      this.state.isAppending = false; // request end
      let res = response.data;
      let scrollTextStatuc = -1;
      if (res.data.fileList.length >= res.data.fileCount && res.data.fileCount > 0) { // 加载完成
        scrollTextStatuc = 2;
      }
      this.setState({
        folderList: res.data.folderList,
        reportList: res.data.fileList,
        requestOver: 2,
        scrollTextStatuc,
        reportTotal: res.data.fileCount
      });
    }, err => {
      if (!err.__CANCEL__) { // 中断执行 error 回调, 则不执行
        this.state.isAppending = false; // request end
        this.setState({requestOver: 1});
      }
    });
  }
  appendItem () {
    let folderId = this.props.match.params.id || '';
    this.setState({
      page: {
        offset: this.state.page.offset + 1,
        limit: 40
      },
      scrollTextStatuc: 0
    });
    this.state.isAppending = true; // request start
    axios.get(`${API.GetReport.URL}${this.state.page.offset}/${this.state.page.limit}?folderId=${folderId}`, {
      cancelToken: new CancelToken(cancel => {
        this.state.httpCancel = cancel;
      })
    }).then(response => {
      this.state.isAppending = false; // request end
      let res = response.data;
      let list = this.state.reportList;
      let scrollTextStatuc = 0;
      for (let i = 0; i < res.data.fileList.length; i++) {
        list.push(res.data.fileList[i]);
      }
      if (list.length >= res.data.fileCount) { // 加载完成
        scrollTextStatuc = 2;
      }
      this.setState({
        reportList: list,
        scrollTextStatuc,
        reportTotal: res.data.fileCount
      });
    }, err => {
      if (!err.__CANCEL__) { // 中断执行 error 回调, 则不执行
        this.state.isAppending = false; // request end
        this.setState({scrollTextStatuc: 1});
      }
    });
  }
  reachEnd () {
    if (this.state.isAppending) { // 加载中
      return;
    }
    if (this.state.reportTotal !== -1 && this.state.reportList.length >= this.state.reportTotal) { // 判断加载完成
      return;
    }
    this.appendItem();
  }
  render () {
    return (
      <section className="g-myReport">
        <ScrollLoad
          beforeDistance={ 100 }
          reachEnd={ this.reachEnd.bind(this) }
          status={ this.state.scrollTextStatuc }
        >
          <ShowComponent state={this.state} />
        </ScrollLoad>
        {this.props.match.params.id ? <Fallback /> : ''}
      </section>
    );
  }
};

export default MyReport;
