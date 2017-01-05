import React,{ Component }  from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { render } from 'react-dom';

import App from '../App';
import { home, login, about } from './views';
import { Indexnav } from './mixin';

import { getCookie } from 'tools/client';

require('sass/base.scss');
require('sass/index.scss');

const Index = React.createClass({
	//1.创建阶段
    getDefaultProps:function() {
        console.log("getDefaultProps");
        return {};
    },
    //2.实例化阶段
    getInitialState:function() {
        console.log("getInitialState");
        return {};
    },
    //render之前调用，业务逻辑都应该放在这里，如对state的操作等
    componentWillMount:function() {
        console.log("componentWillMount");
    },
    //渲染并返回一个虚拟DOM
	render() {
		return (
			<div className="index-wrap">
				<Indexnav />
				{this.props.children}
			</div>
		)
	}
});

// 权限判断
const requireAuth = (nextState, replace) => {
    if (!getCookie('session')) {
        replace({ pathname: '/login' })
    }
};

const routers = (
	<App>
		<Router history={ hashHistory }>
			<Route path="/" component={ Index }>
				<IndexRoute component={ home } onEnter={ requireAuth }/>
				<Route path="/login" component={ login }/>
				<Route path="/about" component={ about } onEnter={ requireAuth }/>
			</Route>
		</Router>
	</App>
)


render(
	routers,
	document.getElementById('page_index')
);