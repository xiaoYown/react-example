import React, { Component } from 'react';
import { createStore, bindActionCreators } from 'redux';
import { connect } from "react-redux";
import store from './Redux/store';

const store = createStore(counter);

store.subscribe(() => { //监听state变化
    console.log(store.getState())
});


class Cal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount () {
		let {ACTIONS} = this.props;
		ACTIONS.get_list();
	}
  change () {
    store.dispatch({type: 'GET_LIST'})
  }
  render () {
    return (
      <section className="login-wrap">
        <button onClick=""></button>
      </section>
    );
  }
};
function mapStateToProps(state){
	const {list} = state.homeList;//
	return {
		_list:list
	};
}; 

function mapDispatchToProps(dispatch){
	return {
		ACTIONS:bindActionCreators(actions,dispatch)
	};
};
export default  connect(mapStateToProps,mapDispatchToProps)(List);
// export default Cal;
