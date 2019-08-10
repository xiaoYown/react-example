import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '@/store/home';
import { modifyInfo } from '@/store/home/user/action';
import ModifyUserInfo from './ModifyUserInfo';

class ViewHome extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  }

  storeUnsubscribe = null

  componentWillMount () {
    this.storeUnsubscribe = store.subscribe(this.watchStore); // 监听用户信息
  }

  componentWillUnmount () {
    this.storeUnsubscribe(); // 取消监听
  }

  watchStore = () => {
    console.log('user info is changed ...');
  }

  submitUserInfo = (values) => {
    store.dispatch(modifyInfo(values));
  }

  render () {
    return (
      <div>
        <h3>Wellcome to home page, { this.props.user.name } !</h3>
        <div>You can edit your information at here:</div>
        <ModifyUserInfo
          user={ this.props.user }
          onChange={this.submitUserInfo}
        />
      </div>
    );
  }
}

export default connect(state => ({
  user: state.user
}))(ViewHome);
