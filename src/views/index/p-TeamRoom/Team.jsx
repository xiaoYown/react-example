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
      <section className="g-member">
        <span>mem</span>
        <div></div>
      </section>
    );
  }
};

export default MyReport;
