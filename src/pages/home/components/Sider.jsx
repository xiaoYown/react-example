import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

class CmpSider extends React.Component {
  render () {
    return (
      <Sider
        collapsible
        style={{
          backgroundColor: '#fff'
        }}
      >
        <div className="logo" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['4']}
        >
          <Menu.Item key="1">
            <Link to="/react/home">
              <Icon type="home" />
              <span className="nav-text">home</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/react/home/center">
              <Icon type="user" />
              <span className="nav-text">center</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/react/home/no_login">
              <span className="nav-text">no login</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/react/home/no_wrapper">
              <span className="nav-text">no wrapper</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default CmpSider;
