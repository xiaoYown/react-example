import React, { Component } from 'react';

class App extends React.Component {
  render () {
    return (
      <div className="g-wrap">
        {this.props.children}
      </div>
    );
  }
};

export default App;
