import React, { Component } from 'react';
import './main.scss';

class MyReport extends React.Component {
  close () {
    this.props.close('close');
  }
  stop (e) {
    e.stopPropagation();
    e.preventDefault();
  }
  // 复制链接
  copyLink () {
    // 选中输入框信息
    this.refs.link.select();
    document.execCommand('SelectAll');
    // 执行复制
    if (document.execCommand('Copy', 'false', null)) {
      // 提示成功
      window.alert('复制成功 ，可将链接发送给朋友！');
    } else {
      // 提示失败
      window.alert('复制失败，请通过其它方式分享！');
    }
  }
  render () {
    return (
      <section className="m-shareLink" ref="shareLink" onClick={ this.close.bind(this) }>
        <div className="m-container" onClick={ this.stop.bind(this) }>
          <div className="share-header">
            <div className="icon iconfont icon-guanbi font-30" onClick={ this.close.bind(this) }></div>
          </div>
          <div className="share-body">
            <div className="title font-28">分享此链接给他人，即可加入团队</div>
            <input ref="link" type="text" className="link font-20" value={ this.props.link } readOnly/>
            <div className="desc font-20">链接有效期为7天</div>
          </div>
          <div className="share-footer" onClick={ this.copyLink.bind(this) }>
            <div className="copy-btn font-28">复制链接</div>
          </div>
        </div>
      </section>
    );
  }
};

export default MyReport;
