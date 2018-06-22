import React, { Component } from 'react';

class MyReport extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      num: 0
    };
  }
  componentWillMount () {
  }
  render () {
    return (
      <section className="g-myReport">
        <span>我的简报</span>
      </section>
    );
  }
};

export default MyReport;
