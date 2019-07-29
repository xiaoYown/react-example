import React from 'react';
import { Button } from 'antd';

class ViewButton extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }
  componentWillMount () {
  }
  render () {
    return (
      <div className="g-antd-button">
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="danger">Danger</Button>
        <Button type="link">Link</Button>
      </div>
    );
  }
};

export default ViewButton;
