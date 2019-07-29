import React from 'react';
import { Layout, Menu, Icon, version } from 'antd';
import { Link } from 'react-router-dom';

import 'antd/dist/antd.css';
import './Antd.scss';

import ViewButton from './components/Button';
import ViewGrid from './components/Grid';
import ViewPagination from './components/Pagination';
import ViewBreadcrumb from './components/Breadcrumb';
import ViewSteps from './components/Steps';
import ViewDataInput from './components/DataInput';
import ViewDemo from './components/Demo';
import ViewUpload from './components/Upload';
import ViewTable from './components/Table';
import ViewTree from './components/Tree';

const { Header, Content, Footer, Sider } = Layout;

// 单选/多选/下拉/输入/表格

class Antd extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }
  componentWillMount () {
  }
  render () {
    let componentName = this.props.match.params.component;
    let selectKey = componentName || '0';
    let view = '';
    switch (componentName) {
      case 'button':
        view = <ViewButton />;
        break;
      case 'grid':
        view = <ViewGrid />;
        break;
      case 'pagination':
        view = <ViewPagination />;
        break;
      case 'breadcrumb':
        view = <ViewBreadcrumb />;
        break;
      case 'steps':
        view = <ViewSteps />;
        break;
      case 'autocomplete':
        view = <ViewDataInput />;
        break;
      case 'demo':
        view = <ViewDemo />;
        break;
      case 'upload':
        view = <ViewUpload />;
        break;
      case 'table':
        view = <ViewTable history={this.props.history} />;
        break;
      case 'tree':
        view = <ViewTree />;
        break;
      default:
        view = '';
    }
    return (
      <div className="g-antd">
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={[selectKey]} mode="inline">
              <Menu.Item key="0">
                <Link to="/m/index/antd">
                  <Icon type="home" />
                  <span>Home</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="button">
                <Link to="/m/index/antd/button">
                  <Icon type="pie-chart" />
                  <span>button</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="grid">
                <Link to="/m/index/antd/grid">
                  <Icon type="pie-chart" />
                  <span>grid</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="pagination">
                <Link to="/m/index/antd/pagination">
                  <Icon type="pie-chart" />
                  <span>pagination</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="breadcrumb">
                <Link to="/m/index/antd/breadcrumb">
                  <Icon type="pie-chart" />
                  <span>breadcrumb</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="steps">
                <Link to="/m/index/antd/steps">
                  <Icon type="pie-chart" />
                  <span>steps</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="autocomplete">
                <Link to="/m/index/antd/autocomplete">
                  <Icon type="pie-chart" />
                  <span>autocomplete</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="demo">
                <Link to="/m/index/antd/demo">
                  <Icon type="pie-chart" />
                  <span>demo</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="upload">
                <Link to="/m/index/antd/upload">
                  <Icon type="pie-chart" />
                  <span>upload</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="table">
                <Link to="/m/index/antd/table">
                  <Icon type="pie-chart" />
                  <span>table</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="tree">
                <Link to="/m/index/antd/tree">
                  <Icon type="pie-chart" />
                  <span>tree</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              &nbsp; version: { version }
            </Header>
            <Content style={{ margin: '10px 16px' }}>
              {view}
              {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div> */}
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
};

export default Antd;
