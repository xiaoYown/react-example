import React, { Component } from 'react';
import { Aside } from '../mixin';

class about extends React.Component {
	constructor(props) {
		super(props);
		this.list = [1,2,3,4];
	}
	render(){
		return(
			<section className="about-wrap">
				<h3>about page</h3>
				<Aside list={ this.list }/>
			</section >
		)
	}
};

export default about