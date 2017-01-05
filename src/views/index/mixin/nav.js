import React from 'react';
import { Link, IndexLink } from 'react-router';

const nav = React.createClass({

    render(){
        return (
            <nav className="nav-index">
                <IndexLink className="nav-item" activeClassName="active" to="/">home</IndexLink>
                <Link className="nav-item" activeClassName="active" to="/login">login</Link>
                <Link className="nav-item" activeClassName="active" to="/about">about</Link>
            </nav>
        )
    }
});

export default nav