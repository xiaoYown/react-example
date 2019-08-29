import React from 'react';

const asyncComponent = loadComponent => (
  class AsyncComponent extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        Component: null
      };
    }

    componentWillMount () { // eslint-disable-line
      if (this.hasLoadedComponent()) {
        return;
      }
      loadComponent().then(module => {
        this.setState({ Component: module.default });
      }).catch(err => {
        console.log('loading chunk err: ' + err);
      });
    }

    hasLoadedComponent () {
      return this.state.Component !== null;
    }

    render () {
      const { Component } = this.state;
      return (Component) ? <Component {...this.props} /> : null;
    }
  }
);

export default asyncComponent;
