import React, { Component } from 'react';

class notData extends React.Component {
  render () {
    return (
      <div className="m-not-data font-28">
        <div className="m-not-data-img" style={{ backgroundImage: 'url(' + this.props.item.image + ')' }}></div>
        <div className="m-not-data-text">{this.props.item.text}</div>
      </div>
    );
  }
};

export default notData;
