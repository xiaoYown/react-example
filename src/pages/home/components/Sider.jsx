import React from 'react';
import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout;

class CmpSider extends React.Component {
  state = {
    mode: 'inline',
    theme: 'light'
  };

  render () {
    const arr = [];
    for (let i = 9; i < 29; i++) {
      arr.push(i);
    }
    return (
      <Sider
        collapsible
        style={{
          overflow: 'auto',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          paddingBottom: 0,
          backgroundColor: '#fff'
        }}
      >
        <div className="logo" />
        <Menu
          theme={ this.state.theme }
          mode={ this.state.inline }
          defaultSelectedKeys={['4']}
        >
          <Menu.Item key="1">
            <Icon type="user" />
            <span className="nav-text">nav 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span className="nav-text">nav 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <span className="nav-text">nav 3</span>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="bar-chart" />
            <span className="nav-text">nav 4</span>
          </Menu.Item>
          <Menu.Item key="5">
            <Icon type="cloud-o" />
            <span className="nav-text">nav 5</span>
          </Menu.Item>
          <Menu.Item key="6">
            <Icon type="appstore-o" />
            <span className="nav-text">nav 6</span>
          </Menu.Item>
          <Menu.Item key="7">
            <Icon type="team" />
            <span className="nav-text">nav 7</span>
          </Menu.Item>
          <Menu.Item key="8">
            <Icon type="shop" />
            <span className="nav-text">nav 8</span>
          </Menu.Item>
          {
            arr.map(index => {
              return <Menu.Item key={ index }>
                <Icon type="shop" />
                <span className="nav-text">nav { index }</span>
              </Menu.Item>;
            })
          }
        </Menu>
      </Sider>
    );
  }
}

export default CmpSider;
