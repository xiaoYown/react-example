import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './main.scss';

class MyReport extends React.Component {
  static propTypes = {
    joinInfo: PropTypes.object.isRequired
  }
  // 关闭提示弹窗
  closeTip () {
    this.props.confirm();
  }
  stop (e) {
    e.stopPropagation();
    e.preventDefault();
  }
  renderHead () {
    if (this.props.joinInfo.title) {
      return (
        <div className="link-header">{this.props.joinInfo.title}</div>
      );
    } else {
      return null;
    }
  }
  render () {
    return (
      <section className="m-shareLink" onClick={ this.closeTip.bind(this) }>
        <div className={`m-container ${!this.props.joinInfo.desc ? 's-align' : ''}`} onClick={ this.stop.bind(this) }>
          { this.renderHead() }
          { this._renderDesc() }
          <div className="link-footer" onClick={ this.closeTip.bind(this) }>
            <div className="copy-btn font-28">{ this.props.joinInfo.confirmText ? this.props.joinInfo.confirmText : '进入团队' }</div>
          </div>
        </div>
      </section>
    );
  }
  _renderDesc () {
    if (this.props.joinInfo.desc) {
      return (
        <div className="link-body">
          <div className="tip-box font-28">
            <p className="tip-desc">{ this.props.joinInfo.desc }</p>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
};

export default MyReport;
