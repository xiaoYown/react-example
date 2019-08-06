import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ViewHome extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  }

  render () {
    return <div>Wellcome to home page, { this.props.user.name } !</div>;
  }
}

export default connect(state => ({
  user: state.user
}))(ViewHome);
