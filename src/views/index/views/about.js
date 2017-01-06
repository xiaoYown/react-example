import React, { Component } from 'react';
import { Aside } from '../mixin';

require('jquery-shapeshift');
// jQuery.fn.shapeshift = shapeshift;

class About extends React.Component {
	constructor(props) {
		super(props);
		this.list = [
			{name: 0, type: 'type_1'},
			{name: 1, type: 'type_2'},
			{name: 2, type: 'type_3'},
			{name: 3, type: 'type_4'}
		];
	}
	shouldComponentUpdate() {
        return false; //告诉react这个component我们打算自己瞎搞，叫它别碰
    }
    componentWillUnmount() {
	}
	componentDidMount() {
		console.log($(".grid-container")[0])
		$(".grid-container").shapeshift({
			minColumns: 4
		});
    }
	render(){
		return(
			<section className="about-wrap">
				<div className="template-area">
					<Aside list={ this.list }/>
					<div className="grid-container">
						<div>Spans 1 Column</div>
						<div data-ss-colspan="2">Spans 2 Columns</div>
						<div data-ss-colspan="3">Spans 3 Columns</div>
						<div data-ss-colspan="4">Spans 4 Columns</div>
					</div>
				</div>
			</section >
		)
	}
};

export default About