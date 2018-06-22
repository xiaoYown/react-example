import React, { Component } from 'react';

class MyTeam extends React.Component {
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
        <span>我的团队</span>
      </section>
    );
  }
};

export default MyTeam;
