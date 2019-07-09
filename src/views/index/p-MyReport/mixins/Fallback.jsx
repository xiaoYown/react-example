import React, { Component } from 'react';
import { withRouter } from 'react-router';

class fallback extends React.Component {
  render () {
    return (
      <div className="m-report-fallback" onClick={this.goback.bind(this)}>
        <i className="iconfont icon-yidong-shangyiji font-40"></i>
      </div>
    );
  }
  goback (e) {
    e.preventDefault();
    if (window.history.length >= 3) {
      this.props.history.go(-1);
    } else {
      this.props.history.push(`/m/index/myreport`);
    }
  }
};

export default withRouter(fallback);
