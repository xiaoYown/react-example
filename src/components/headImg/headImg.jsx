import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './main.scss';

class headImg extends React.Component {
  static defaultProps = {
    size: 94,
    _style: {}
  }
  static propTypes = {
    size: PropTypes.number,
    userName: PropTypes.string,
    imgUrl: PropTypes.string,
    _style: PropTypes.object
  }
  computeRem (size) {
    return size * 320 / 750 / 20 + 'rem';
  }
  formatImgStyle () {
    const size = this.computeRem(this.props.size);
    return Object.assign({}, this.props._style, {
      width: size,
      height: size,
      backgroundImage: `url(${this.props.imgUrl})`
    });
  }
  formatTextStyle () {
    const size = this.computeRem(this.props.size);
    return Object.assign({}, this.props._style, {
      width: size,
      height: size,
      lineHeight: size
    });
  }
  render () {
    const imgUrl = this.props.imgUrl;
    const userName = this.props.userName;

    if (imgUrl && imgUrl.indexOf('missing_face.png') === -1) {
      return (
        <div className="g-headImg" style={this.formatImgStyle()}></div>
      );
    } else if (/^[\u4E00-\u9FFF]+$/.test(userName)) {
      return (
        <div className="g-headImg" style={this.formatTextStyle()}>{userName.substr(-1, 1)}</div>
      );
    } else {
      return (
        <div className="g-headImg" style={this.formatTextStyle()}>{userName.substr(0, 1)}</div>
      );
    }
  }
};

export default headImg;
