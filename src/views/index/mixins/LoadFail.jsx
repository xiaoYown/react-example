import React, { Component } from 'react';
import { withRouter } from 'react-router';

class loadFail extends React.Component {
  render () {
    return (
      <div className="m-loading-fail font-28">
        <div className="m-loading-fail-img" style={{ backgroundImage: 'url(' + this.props.item.image + ')' }}></div>
        <div className="m-loading-fail-text">{this.props.item.text}</div>
        <div className="m-loading-fail-btn" onClick={this.refresh.bind(this)}>{ this.props.item.btn || '点击刷新' }</div>
        {this.props.item.showBack ? <span className="m-loading-fail-back font-26" onClick={this.goback.bind(this)}>返回上一页</span> : ''}
      </div>
    );
  }
  refresh () {
    window.location.reload();
  }
  goback (e) {
    e.preventDefault();
    this.props.history.go(-1);
  }
};

export default withRouter(loadFail);
