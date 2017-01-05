import React, { Component } from 'react';
import cookie from 'react-cookie';
import { saveCookie, getCookie, removeCookie, signOut } from 'tools/client';

const login = React.createClass({
	login(){
		console.log('login success');
		saveCookie('session', this.refs.userId.value);
		this.props.router.push({ pathname: '/' });
	},
	signOut(){
		console.log('sign out success');
		signOut();
		this.props.router.push({ pathname: '/' });
	},
	render(){
		const login = (
			<div className="login-info">
				<label className="login-item">
					<h4>id</h4>
					<input type="text" ref="userId"/>
				</label>
				<label className="login-item">
					<h4>pwd</h4>
					<input type="text" ref="userPwd"/>
				</label>
				<button onClick={this.login} >Login</button>
			</div>
		);
		const signOut = (
			<div className="login-info">
				<button onClick={this.signOut} >Sigin out</button>
			</div>
		);
		const Content = React.createClass({
			render(){
				if( !getCookie('session') )
					return login
				return signOut
			}
		});
		return(
			<section className="login-wrap">
				<Content />
			</section>
		)
	}
});

export default login
