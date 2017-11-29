import React, { Component } from 'react';
import d3Chart from 'libraries/d3/index';

class D3 extends React.Component {
  componentDidMount () {
    var el = this.refs.chart;
    d3Chart.create(el);
  }
  // componentDidUpdate () {i
  // }
  // getChartState () {
  //   return {
  //   };
  // }
  // componentWillUnmount () {
  // }

  render () {
    return (
      <div className="Chart" ref="chart"></div>
    );
  }
};

export default D3;
