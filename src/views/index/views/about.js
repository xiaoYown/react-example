import React, { Component } from 'react';
import { Aside } from '../mixin';

// import { ReactGridLayout, width } from 'react-grid-layout';
var WidthProvider = require('react-grid-layout').WidthProvider;
var ReactGridLayout = require('react-grid-layout');
ReactGridLayout = WidthProvider(ReactGridLayout);

const ResponsiveReactGridLayout = WidthProvider(ReactGridLayout.Responsive);

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
    }
	render(){
		// var layout = [
		// 	{i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
		// 	{i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
		// 	{i: 'c', x: 4, y: 0, w: 1, h: 2}
		// ];	
					// <ResponsiveReactGridLayout className="layout" layouts={layouts}
					// breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
					// cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
					// 	<div key="1" data-grid={{w: 2, h: 3, x: 0, y: 0}}><span className="text">1</span></div>
					// 	<div key="2" data-grid={{w: 2, h: 3, x: 2, y: 0}}><span className="text">2</span></div>
					// 	<div key="3" data-grid={{w: 2, h: 3, x: 4, y: 0}}><span className="text">3</span></div>
					// 	<div key="4" data-grid={{w: 2, h: 3, x: 6, y: 0}}><span className="text">4</span></div>
					// 	<div key="5" data-grid={{w: 2, h: 3, x: 8, y: 0}}><span className="text">5</span></div>
					// </ResponsiveReactGridLayout>
	var layouts = {};
		return(
			<section className="about-wrap">
				<div className="template-area">
					<Aside list={ this.list }/>
					<ReactGridLayout className="layout" cols={12} colWidth={30} rowHeight={30} width={1200}>
						<div key="a" data-grid={{ isResizable: true, x: 0, y: 0, w: 1, h: 2/*, static: true*/}}>a</div>
						<div key="b" data-grid={{ isResizable: true, x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4}}>b</div>
						<div key="c" data-grid={{ isResizable: true, x: 4, y: 0, w: 1, h: 2}}>c</div>
						<div key="d" data-grid={{ isResizable: true, x: 4, y: 0, w: 1, h: 2}}>d</div>
					</ReactGridLayout>
				</div>
			</section >
		)
	}
};

export default About