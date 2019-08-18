import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import UserInfo from '../../components/UserInfo';

class ViewHome extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  }

  render () {
    return (
      <div>
        <h3>Wellcome to home page, { this.props.user.name } !</h3>
        <div>You can edit your information at here:</div>
        <UserInfo
          disabled
          user={ this.props.user }
        />
        <Button type="ghost" onClick={() => this.props.history.push('/react/home/center')}>修改</Button>
      </div>
    );
  }
}

export default connect(state => ({
  user: state.user
}))(ViewHome);
