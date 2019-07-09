import React, { Component } from 'react';
import './main.scss';
// @import '@/assets/sass/index/mixins/nav.scss';

let timer = null;

class ScrollLoad extends Component {
  static defaultProps = {
    scrollView: window, // 滚动视口
    beforeDistance: 0, // 距离底部前 x 距离时执行滚动到底部函数
    viewH: document.documentElement.clientHeight, // 视口高度
    status: -1, // 0 加载中 1 加载失败，重新加载 2 加载完成
    reachEnd () {}
  }
  componentDidMount () {
    this.props.scrollView.addEventListener('scroll', this.scrolling.bind(this));
  }
  componentWillUnmount () {
    this.props.scrollView.removeEventListener('scroll', this.scrolling.bind(this));
  }

  scrolling () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(this.scrollingCal.bind(this), 200);
  }
  scrollingCal () {
    let scrollTop; // 滚动距离
    let viewAndScroll; // 视口容器高度 + 滚动距离
    let viewOffsetHeight; // 视口实际高度
    if (this.props.scrollView === window) {
      scrollTop = window.scrollY;
      viewOffsetHeight = document.body.offsetHeight;
    } else {
      scrollTop = this.props.scrollView.scrollTop;
      viewOffsetHeight = this.props.scrollView.offsetHeight;
    }
    viewAndScroll = this.props.viewH + scrollTop; // 视口高度 + 滚动距离
    if (viewAndScroll >= viewOffsetHeight - this.props.beforeDistance) { // 底部元素滚动进入视口前 beforeDistance 距离, 执行回调
      this.props.reachEnd();
    }
  }

  render () {
    return (
      <div className="m-scrollLoad">
        { this.props.children }
        <div className="m-scrollLoadText" style={{ display: this.props.status === -1 ? 'none' : 'block' }}>{this.props.status === 0 ? '加载中...' : this.props.status === 1 ? '加载失败，重新加载' : '加载完成'}</div>
      </div>
    );
  }
};

export default ScrollLoad;
