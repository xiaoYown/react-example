import React, { Component } from 'react';
import ReduxCmpt from './redux.jsx';

class home extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      num: 0
    };
  }
  componentDidMount () {
    // window.onclick = () => {
    //   let num = this.state.num + 1;
    //   num = num > 3 ? 3 : num;
    //   this.setState({
    //     num: num
    //   });
    // };
  }
  render () {
    return (
      <section className="home-wrap">
        <h3>home page</h3>
        <ReduxCmpt num={ this.state.num }/>
      </section>
    );
  }
};

export default home;
