import React, { Component } from 'react';

class Message extends React.Component {
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
        <span>消息</span>
      </section>
    );
  }
};

export default Message;
