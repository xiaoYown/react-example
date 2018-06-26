import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import CSSTransition from 'react-transition-group/CSSTransition';

const duration = 200; // fade 过渡时间

class Loading extends Component {
  state = {
    show: false,
    hide: true
  }
  render () {
    return (
      <CSSTransition
        in={this.state.show}
        timeout={0}
        style={{
          display: this.state.hide ? 'none' : 'block'
        }}
        classNames={{
          enter: 'fade-enter',
          enterDone: 'fade-enter-active',
          exit: 'fade-exit',
          exitDone: 'fade-exit-active'
        }}
      >
        <div className="global-loading font-18">
          <div className="l-wrapper">
            <svg viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <g id="loading-circle" className="g-circles g-circles--v1">
                <circle transform="translate(35, 16.698730) rotate(-30) translate(-35, -16.698730) " cx="35" cy="16.6987298" r="10"></circle>
                <circle transform="translate(16.698730, 35) rotate(-60) translate(-16.698730, -35) " cx="16.6987298" cy="35" r="10"></circle>
                <circle transform="translate(10, 60) rotate(-90) translate(-10, -60) " cx="10" cy="60" r="10"></circle>
                <circle transform="translate(16.698730, 85) rotate(-120) translate(-16.698730, -85) " cx="16.6987298" cy="85" r="10"></circle>
                <circle transform="translate(35, 103.301270) rotate(-150) translate(-35, -103.301270) " cx="35" cy="103.30127" r="10"></circle>
                <circle cx="60" cy="110" r="10"></circle>
                <circle transform="translate(85, 103.301270) rotate(-30) translate(-85, -103.301270) " cx="85" cy="103.30127" r="10"></circle>
                <circle transform="translate(103.301270, 85) rotate(-60) translate(-103.301270, -85) " cx="103.30127" cy="85" r="10"></circle>
                <circle transform="translate(110, 60) rotate(-90) translate(-110, -60) " cx="110" cy="60" r="10"></circle>
                <circle transform="translate(103.301270, 35) rotate(-120) translate(-103.301270, -35) " cx="103.30127" cy="35" r="10"></circle>
                <circle transform="translate(85, 16.698730) rotate(-150) translate(-85, -16.698730) " cx="85" cy="16.6987298" r="10"></circle>
                <circle cx="60" cy="10" r="10"></circle>
              </g>
              <use xlinkHref="#loading-circle" className="use"/>
            </svg>
          </div>
        </div>
      </CSSTransition>
    );
  }
};

Loading.newInstance = function newNotificationInstance (properties) {
  let props = properties || {};
  let div = document.createElement('div');
  document.body.appendChild(div);
  let notification = ReactDOM.render(React.createElement(Loading, props), div);
  return {
    show () { // 显示, display 需同时设置
      notification.setState({
        show: true,
        hide: false
      });
    },
    hide () { // 隐藏需先等待过渡结束后, 再设置 display
      notification.setState({
        show: false
      });
      setTimeout(() => {
        notification.setState({
          hide: true
        });
      }, duration);
    }
  };
};

export default Loading;
