import React,{ Component }  from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { render } from 'react-dom';

import App from '../App';
import { home, login, about } from './views';
import { Indexnav } from './mixin';

import { getCookie } from 'tools/client';

require('sass/base.scss');
require('sass/index.scss');

const routers = React.createClass({
	render() {
		return (
			<div className="index-wrap">
				<h3>root</h3>
				<Indexnav />
				{this.props.children}
			</div>
		)
	}
});

const requireAuth = (nextState, replace) => {
    if (!getCookie('session')) {
        replace({ pathname: '/login' })
    }
}

render((
	<App>
		<Router history={ hashHistory }>
			<Route path="/" component={ routers }>
				<IndexRoute component={ home } onEnter={ requireAuth }/>
				<Route path="/login" component={ login }/>
				<Route path="/about" component={ about } onEnter={ requireAuth }/>
			</Route>
		</Router>
	</App>
	),
	document.getElementById('page_index')
)