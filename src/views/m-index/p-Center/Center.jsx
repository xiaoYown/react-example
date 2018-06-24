import React from 'react';
import store from '@/store/index/store';
import { connect } from 'react-redux';
import { increament, decreament, numModify } from '@/store/index/user/action';
import PropTypes from 'prop-types';

class Center extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    increament: PropTypes.func.isRequired,
    decreament: PropTypes.func.isRequired,
    numModify: PropTypes.func.isRequired
  }
  setNum (type, num = 0) {
    switch (type) {
      case 1:
        // this.props.increament();
        store.dispatch(increament());
        break;
      case -1:
        // this.props.decreament();
        store.dispatch(decreament());
        break;
      default:
        // this.props.numModify({ num });
        console.log(num);
        store.dispatch(numModify({ num }));
    }
  }
  shouldComponentUpdate (nextProps, nexState) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps) || JSON.stringify(this.state) !== JSON.stringify(nexState);
  }
  render () {
    return (
      <section className="g-myReport">
        <span>个人中心</span>
        <div>
          <div>
            <h2 onClick={this.setNum.bind(this, 1)}>+</h2>
            <h2 onClick={this.setNum.bind(this, -1)}>-</h2>
            <h2 onClick={this.setNum.bind(this, 0, 0)}>reset</h2>
          </div>
          <div>num: { this.props.user.num }</div>
        </div>
      </section>
    );
  }
};

export default connect(state => ({
  user: state.user
}), {
  increament,
  decreament,
  numModify
})(Center);
