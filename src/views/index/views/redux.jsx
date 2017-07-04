import React, { Component } from 'react';
import { createStore } from 'redux';
import Counter from '../mixin/counter/Counter.jsx';
import counter from 'Store/index/counter';

const store = createStore(counter);
store.subscribe(listener);
function listener () {
  console.log(store.getState());
}
class Cal extends React.Component {
  // constructor (props) {
  //   super(props);
  // }
  render () {
    return (
      <section className="login-wrap">
        <p>{store.getState()}</p>
        <Counter
          value={store.getState()}
          onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
          onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
        />
      </section>
    );
  }
};

export default Cal;
