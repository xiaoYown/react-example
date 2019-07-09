import React, { Component } from 'react';
import config from 'config/config';

class Type extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      types: {
        0: '系统群发',
        1: '@',
        2: '评论',
        3: '通知',
        4: '私信',
        5: '通知',
        6: '系统',
        7: '协作',
        8: '协作',
        9: '协作',
        10: '协作',
        11: '评论',
        12: '协作',
        13: '协作',
        14: '权限',
        15: '权限',
        16: '权限',
        17: '批注',
        18: '批注',
        19: '批注',
        20: '批注',
        21: '批注',
        22: '权限',
        23: '权限',
        24: '权限'
      }
    };
  }
  componentWillMount () {
  }
  showContent (props) {
    let item = props.items;
    if (item.type === 0) {
      // 系统消息
      return (
        <div className="p-index-message-info-content font-26">
          <span className="p-user">{item.content}</span>
        </div>
      );
    } else if (item.type === 1) {
      // @某人
      return (
        <div className="p-index-message-info-content font-26">
          <span className="p-user">{item.user.name}</span>
          <span className="p-normal-text">在简报</span>
          <span className="p-report-link" onClick={this.goToPage.bind(this, item.connection.report_id)}>{item.connection.title || '无标题'}</span>
          <span className="p-normal-text">中@了您</span>
        </div>
      );
    } else if (item.type === 2) {
      // 评论
      return (
        <div className="p-index-message-info-content font-26">
          <span className="p-user">{item.user.name}</span>
          <span className="p-normal-text">在简报</span>
          <span className="p-report-link" onClick={this.goToPage.bind(this, item.connection.report_id)}>{item.connection.title || '无标题'}</span>
          <span className="p-normal-text">中评论了您</span>
        </div>
      );
    } else if (item.type === 3) {
      // 转送报告通知
      return (
        <div className="p-index-message-info-content font-26">
          <span className="p-normal-text">您收到</span>
          <span className="p-user">{item.user.name}</span>
          <span className="p-normal-text">发送的简报</span>
          <span className="p-report">{item.connection.title || '无标题'}</span>
          <span className="p-normal-text">请到[ 收到简报 ]中查看</span>
        </div>
      );
    } else if (item.type === 5 && item.content) {
      // 管理员通知
      return (
        <div className="p-index-message-info-content font-26">
          <span className="p-user">{item.content}</span>
        </div>
      );
    } else if (item.type === 6 && item.content) {
      // 系统消息
      return (
        <div className="p-index-message-info-content font-26">
          <span className="p-normal-text">您的简报</span>
          <span className="p-report">{item.connection.title || '无标题'}</span>
          <span className="p-normal-text">{item.content}</span>
        </div>
      );
    } else if (item.type === 7) {
      // 协作消息1
      return (
        <div className="p-index-message-info-content font-26">
          <span className="p-user">{item.connection.invited_name}</span>
          <span className="p-normal-text">添加您为简报</span>
          <span className="p-report">{item.connection.title || '无标题'}</span>
          <span className="p-normal-text">的协作者</span>
        </div>
      );
    } else if (item.type === 8) {
      // 协作消息2
      return (
        <div className="p-index-message-info-content font-26">
          <span className="p-user">{item.connection.invited_name}</span>
          <span className="p-normal-text">添加</span>
          <span className="p-user">{item.user.name}</span>
          <span className="p-normal-text">为简报</span>
          <span className="p-report">{item.connection.title || '无标题'}</span>
          <span className="p-normal-text">的协作者</span>
        </div>
      );
    } else if (item.type === 9) {
      // 协作消息3
      return (
        <div className="p-index-message-info-content font-26">
          <span className="p-user">{item.connection.invited_name}</span>
          <span className="p-normal-text">退出了简报</span>
          <span className="p-report">{item.connection.title || '无标题'}</span>
          <span className="p-normal-text">的协作</span>
        </div>
      );
    } else if (item.type === 10) {
      // 协作消息4
      return (
        <div className="p-index-message-info-content font-26">
          <span className="p-normal-text">您被简报</span>
          <span className="p-report">{item.connection.title || '无标题'}</span>
          <span className="p-normal-text">的所有者</span>
          <span className="p-user">{item.user.name}</span>
          <span className="p-normal-text">移出协作</span>
        </div>
      );
    } else if (item.type === 11) {
      // 回复
      return (
        <div className="p-index-message-info-content font-26">
          <span className="p-user">{item.connection.send_name}</span>
          <span className="p-normal-text">在简报</span>
          <span className="p-report-link" onClick={this.goToPage.bind(this, item.connection.report_id)}>{item.connection.title || '无标题'}</span>
          <span className="p-normal-text">中回复了您的评论</span>
        </div>
      );
    } else if (item.type === 12) {
      // 邀请用户
      return (
        <div className="p-index-message-info-content font-26">
          <span className="p-user">{item.connection.invited_name}</span>
          <span className="p-normal-text">添加了</span>
          <span className="p-user">{item.connection.invited_name}</span>
          <span className="p-normal-text">为简报</span>
          <span className="p-report">{item.connection.title || '无标题'}</span>
          <span className="p-normal-text">的协作者</span>
        </div>
      );
    } else if (item.type === 13) {
      // 退出协作
      return (
        <div className="p-index-message-info-content font-26">
          <span className="p-user">{item.user.name}</span>
          <span className="p-normal-text">退出了简报</span>
          <span className="p-report">{item.connection.title || '无标题'}</span>
          <span className="p-normal-text">的协作</span>
        </div>
      );
    } else if (item.type === 14) {
      // 申请查看简报集
      return (
        <div className="p-index-message-info-content font-26">
          <span className="p-user">{item.user.name}</span>
          <span className="p-normal-text">向您申请查看</span>
          <span className="p-report-link" onClick={this.goToPage.bind(this, item.connection.report_id)}>{item.connection.title || '无标题'}</span>
        </div>
      );
    } else if (item.type === 15) {
      // 通过申请查看简报集
      return (
        <div className="p-index-message-info-content font-26">
          <span className="p-user">{item.user.name}</span>
          <span className="p-normal-text">已同意您查看</span>
          <span className="p-report-link" onClick={this.goToPage.bind(this, item.connection.report_id)}>{item.connection.title || '无标题'}</span>
        </div>
      );
    } else if (item.type === 16) {
      // 拒绝申请查看简报集
      return (
        <div className="p-index-message-info-content font-26">
          <span className="p-user">{item.user.name}</span>
          <span className="p-normal-text">已拒绝您查看</span>
          <span className="p-report">{item.connection.title || '无标题'}</span>
        </div>
      );
    } else if (item.type === 17) {
      // 新增批注
      return (
        <div className="p-index-message-info-content font-26">
          <span className="p-user">{item.connection.user_name}</span>
          <span className="p-normal-text">在</span>
          <span className="p-report" onClick={this.goToPage.bind(this, item.connection.report_id)}>{item.connection.title || '无标题'}</span>
          <span className="p-normal-text">添加了一条批注</span>
        </div>
      );
    } else if (item.type === 18) {
      // 在批注中@了你
      return (
        <div className="p-index-message-info-content font-26">
          <span className="p-user">{item.connection.user_name}</span>
          <span className="p-normal-text">在</span>
          <span className="p-report" onClick={this.goToPage.bind(this, item.connection.report_id)}>{item.connection.title || '无标题'}</span>
          <span className="p-normal-text">添加批注的批注中提到了你</span>
        </div>
      );
    } else if (item.type === 19) {
      // 收到私密批注
      return (
        <div className="p-index-message-info-content font-26">
          <span className="p-normal-text">你在</span>
          <span className="p-report" onClick={this.goToPage.bind(this, item.connection.report_id)}>{item.connection.title || '无标题'}</span>
          <span className="p-normal-text">收到一条</span>
          <span className="p-user">{item.connection.user_name}</span>
          <span className="p-normal-text">发起的私密批注</span>
        </div>
      );
    } else if (item.type === 20) {
      // 我的简报收到批注
      return (
        <div className="p-index-message-info-content font-26">
          <span className="p-normal-text">你在</span>
          <span className="p-report" onClick={this.goToPage.bind(this, item.connection.report_id)}>{item.connection.title || '无标题'}</span>
          <span className="p-normal-text">收到一条批注回复</span>
        </div>
      );
    } else if (item.type === 21) {
      // 我的批注收到回复
      return (
        <div className="p-index-message-info-content font-26">
          <span className="p-normal-text">你在</span>
          <span className="p-report" onClick={this.goToPage.bind(this, item.connection.report_id)}>{item.connection.title || '无标题'}</span>
          <span className="p-normal-text">收到一条批注回复</span>
          <span className="p-user">{item.connection.user_name}</span>
          <span className="p-normal-text">批注回复</span>
        </div>
      );
    } else if (item.type === 22) {
      // 审核团队申请加入
      return (
        <div className="p-index-message-info-content font-26">
          <span className="p-user">{item.connection.add_user_name}</span>
          <span className="p-normal-text">向您申请加入</span>
          <span className="p-report" onClick={this.goToTeam.bind(this, item.connection.team_id)}>{item.connection.team_name}</span>
        </div>
      );
    } else if (item.type === 23) {
      // 同意团队申请加入
      return (
        <div className="p-index-message-info-content font-26">
          <span className="p-normal-text">已同意您加入团队</span>
          <span className="p-report" onClick={this.goToTeam.bind(this, item.connection.team_id)}>{item.connection.team_name}</span>
        </div>
      );
    } else if (item.type === 24) {
      // 拒绝团队申请加入
      return (
        <div className="p-index-message-info-content font-26">
          <span className="p-normal-text">已拒绝您加入团队</span>
          <span className="p-report">{item.connection.team_name}</span>
        </div>
      );
    } else if (item.type === 25) {
      return (
        <div className="p-index-message-info-content font-26">
          <span className="p-user">{item.connection.add_user_name}</span>
          <span className="p-normal-text">向您申请加入</span>
          <span className="p-report" onClick={this.goToTeam.bind(this, item.connection.team_id)}>{item.connection.team_name}</span>
        </div>
      );
    } else {
      return null;
    }
  }
  showfooder (props) {
    let type = props.items.type;
    let isOperated = props.items.connection.is_operated;
    if (type === 14 && isOperated === 0) {
      // 申请查看简报未操作
      return (
        <div className="p-index-message-info-fooder font-22">
          <span className="p-btn p-btn-normal" onClick={this.props.handlerBtn.bind(this, 'allow')}>同意</span>
          <span className="p-btn p-btn-ghost" onClick={this.props.handlerBtn.bind(this, 'reject')}>拒绝</span>
        </div>
      );
    } else if (type === 14 && isOperated === 1) {
      // 已同意
      return (
        <div className="p-index-message-info-fooder font-22">
          <span className="p-allow">已同意查看</span>
        </div>
      );
    } else if (type === 14 && isOperated === 2) {
      // 已拒绝
      return (
        <div className="p-index-message-info-fooder font-22">
          <span className="p-reject">已拒绝查看</span>
        </div>
      );
    } else if (type === 22 && isOperated === 0) {
      // 申请加入团队审核未操作
      return (
        <div className="p-index-message-info-fooder font-22">
          <span className="p-btn p-btn-normal" onClick={this.props.teamPermissions.bind(this, 'allow')}>同意</span>
          <span className="p-btn p-btn-ghost" onClick={this.props.teamPermissions.bind(this, 'reject')}>拒绝</span>
        </div>
      );
    } else if (type === 22 && isOperated === 1) {
      // 已同意
      return (
        <div className="p-index-message-info-fooder font-22">
          <span className="p-allow">已同意</span>
        </div>
      );
    } else if (type === 22 && isOperated === 2) {
      // 已拒绝
      return (
        <div className="p-index-message-info-fooder font-22">
          <span className="p-reject">已拒绝</span>
        </div>
      );
    } else if (type === 25) {
      // 解散团队,链接失效
      return (
        <div className="p-index-message-info-fooder font-22">
          <span className="p-reject">该请求已失效</span>
        </div>
      );
    } else {
      return null;
    }
  }
  goToPage (id) {
    window.location.href = `${config.api}/banber/${id}.html`;
  }
  goToTeam (id) {
    window.location.href = `${config.api}/m/myteam/team/${id}`;
  }
  render () {
    return (
      <div className="p-index-message-info">
        <div className="p-index-message-info-header font-22">
          <span className="p-type">[ {this.state.types[this.props.items.type]} ]</span>
          <span className="p-time">&nbsp;{this.props.items.time.substring(5, 16)}</span>
        </div>
        {this.showContent(this.props)}
        {this.showfooder(this.props)}
      </div>
    );
  }
};

export default Type;
