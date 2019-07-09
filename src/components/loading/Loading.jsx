import React, { Component } from 'react';

class loading extends React.Component {
  render () {
    return (
      <div className="m-report-loading">
        <div className="m-report-loading-img"></div>
        <div className="m-report-loading-text font-22">{ this.props.title })</div>
      </div>
    );
  }
};

export default loading;
