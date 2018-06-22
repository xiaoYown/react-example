import React, { Component } from 'react';

class Center extends React.Component {
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
        <span>个人中心</span>
      </section>
    );
  }
};

export default Center;
