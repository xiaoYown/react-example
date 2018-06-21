import React, { Component } from 'react';
import { BrowserRouter as Link, NavLink } from 'react-router-dom';
import { getCookie, signOut } from '@/utils/client';

class nav extends Component {
  signOut () {
    signOut();
    window.location.href = '/';
  }
  render () {
    return (
      <nav className="nav-index">
        <NavLink className="nav-item" activeClassName="active" exact to="/">home</NavLink>
        <NavLink className="nav-item" activeClassName="active" to="/about">about</NavLink>
        <NavLink className="nav-item" activeClassName="active" to="/redux">redux</NavLink>
        <NavLink className="nav-item" activeClassName="active" to="/d3">d3</NavLink>
      </nav>
    );
  }
};

export default nav;
