import React, { Component } from 'react';

class loading extends React.Component {
  render () {
    return (
      <div className="m-report-loading">
        <div className="m-report-loading-img"></div>
        <div className="m-report-loading-text font-22">简报在来寻找您的路上,客官请稍等(✪ω✪)</div>
      </div>
    );
  }
};

export default loading;
