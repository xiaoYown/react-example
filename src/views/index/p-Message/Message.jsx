import React, { Component } from 'react';
import axios from 'axios';
import ScrollLoad from '@/components/scroll/ScrollLoad';

import * as API from '@/assets/js/interface/message.js';
import TypeEl from './mixins/Type.jsx';
import NotData from '@/views/index/mixins/NotData.jsx';
import LoadFail from '@/views/index/mixins/LoadFail.jsx';

class Message extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      requestOver: 0,
      scrollTextStatus: -1,
      num: 0,
      list: [],
      messageList: [],
      isAppending: false,
      page: {
        limit: 30,
        offset: 1
      },
      notDataTip: {
        image: '/m/static/images/not-report.png',
        text: '哎呀,这里暂无消息(⊙o⊙)…'
      },
      failTip: {
        image: '/m/static/images/not-report.png',
        text: '消息加载失败了,一二三四再来一次⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄'
      }
    };
  }
  componentWillMount () {
    document.title = '消息中心';
    // this.appendItem();
    this.getMessagaList();
  }
  componentWillUnmount () {
    this._isMounted = false;
  }
  getMessagaList () {
    this.setState({
      messageList: [],
      requestOver: 0
    });
    this._isMounted = true;
    axios.get(`${API.GetMessageList.URL}?limit=${this.state.page.limit}&offset=${this.state.page.offset}`)
      .then(response => {
        if (this._isMounted) {
          let res = response.data;
          this.setState({
            messageList: res.data.message,
            requestOver: 1
          });
          if (res.data.message.length !== res.data.message_count) this.state.isAppending = false;
        }
      }, () => {
        if (this._isMounted) {
          this.setState({requestOver: 2});
        }
      });
  }
  appendItem () {
    this.state.scrollTextStatus = 0;
    this._isMounted = true;
    axios.get(`${API.GetMessageList.URL}?limit=${this.state.page.limit}&offset=${this.state.page.offset}`)
      .then(response => {
        if (this._isMounted) {
          let res = response.data;
          let list = this.state.messageList;
          let state = {};
          for (let i = 0; i < res.data.message.length; i++) {
            list.push(res.data.message[i]);
          }
          state.list = list;
          if (list.length >= res.data.message_count) {
            state.scrollTextStatus = 2;
          }
          this.setState(state);
          if (list.length !== res.data.message_count) this.state.isAppending = false;
        }
      }, () => {
        if (this._isMounted) {
          this.state.scrollTextStatus = 2;
        }
      });
  }
  reachEnd () {
    if (this.state.isAppending) {
      return;
    }
    let page = JSON.parse(JSON.stringify(this.state.page));
    page.offset = page.offset + 1;
    this.setState({ page });
    this.state.isAppending = true;
    this.appendItem();
  }
  handlerBtn (index, item, type) {
    let list = this.state.messageList;
    let url = type === 'allow' ? API.AllowViweReport.URL : API.RejectViweReport.URL;
    let data = {
      reportGatherId: item.connection.report_gather_id,
      applyUserId: item.user.id
    };
    this._isMounted = true;
    axios.post(url, data)
      .then(response => {
        if (this._isMounted) {
          if (response.data.code === 0) {
            if (type === 'allow') {
              list[index].connection.is_operated = 1;
            } else {
              list[index].connection.is_operated = 2;
            }
            this.setState({
              messageList: list
            });
          }
        }
      });
  }
  /**
   * @description types为22权限申请时同意或者拒绝申请
   * @param {Object} item - 某条消息的对象
   * @param {Object} index - item在message中对应下标
   * @param {Object} type - 操作类型(可选) ''(default) | allow
   */
  teamPermissions (index, item, type) {
    let list = this.state.messageList;
    axios.post(API.AddTeamAudit.URL, {
      team_id: item.connection.team_id,
      is_operated: type === 'allow' ? 1 : 2,
      add_user_id: item.user.id,
      message_id: item.id
    }).then(response => {
      if (this._isMounted) {
        let res = response.data;
        if (res.code === 0) {
          if (type === 'allow') {
            list[index].connection.is_operated = 1;
          } else {
            list[index].connection.is_operated = 2;
          }
        } else if (res.code === 6009) {
          list[index].connection.is_operated = res.data.is_operated;
        } else {
          window.alert(res.message);
        }
        this.setState({
          messageList: list
        });
      }
    });
  }
  render () {
    return (
      <section className="g-myReport">
        <ScrollLoad
          beforeDistance={ 100 }
          reachEnd={ this.reachEnd.bind(this) }
          status={this.state.scrollTextStatus}
        >
          <ul className="p-index-message">
            {this.state.messageList.map((item, index) =>
              <li className="p-index-message-item" key={index}>
                {this.state.messageList.length ? <TypeEl items={item} handlerBtn={this.handlerBtn.bind(this, index, item)} teamPermissions={this.teamPermissions.bind(this, index, item)}/> : ''}
              </li>
            )}
          </ul>
        </ScrollLoad>
        {(!this.state.messageList.length && this.state.requestOver === 1) ? <NotData item={this.state.notDataTip} /> : ''}
        {(!this.state.messageList.length && this.state.requestOver === 2) ? <LoadFail item={this.state.failTip} /> : ''}
      </section>
    );
  }
};

export default Message;
