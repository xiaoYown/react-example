import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './main.scss';

class Popup extends Component {
  static defaultProps = {
    title: '我是标题'
  }
  static propTypes = {
    title: PropTypes.string,
    confirm: PropTypes.func,
    close: PropTypes.func
  }
  // 阻止冒泡
  stopPropagation (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  // 隐藏遮罩
  handleHidePopup (e) {
    this.stopPropagation(e);
    this.props.close();
  }
  render () {
    return (
      <div className="g-popup" onClick={(e) => this.handleHidePopup(e)}>
        <div className="g-popupCell">
          <div className="g-popupWrapper" onClick={(e) => this.stopPropagation(e)}>
            <div className="g-popupHeader">{this.props.title}</div>
            <div className="g-popupBody">
              { this.props.children }
            </div>
            <div className="g-popupFooter">
              <div className="g-popupBtn left" onClick={this.props.close.bind(this)}>取消</div>
              <div className="g-popupBtn right" onClick={this.props.confirm.bind(this)}>确定</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Popup;
