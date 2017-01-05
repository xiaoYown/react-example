import React, { Component } from 'react'

class aside extends React.Component {
    constructor(props) {
		super(props);
	}
	render(){
        const list = this.props.list.map((item) => 
            <li key={ item.toString() } className="aside-item">
                select-{item}
            </li>
        );
       
		return(
			<div className="template-area">
                <ul className="aside-container">
                    {list}
                </ul>
            </div>
		)
	}
};

export default aside