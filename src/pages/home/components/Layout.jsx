import React from 'react';
import { Layout } from 'antd';
import CmpSider from './Sider';
import CmpHeader from './Header';

const { Content } = Layout;

class CmpLayout extends React.Component {
  render () {
    return <Layout>
      <CmpSider />
      <Layout style={{ height: '100vh' }}>
        {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
        <CmpHeader />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ height: '500vh', padding: 24, background: '#fff', textAlign: 'center' }}>
            { this.props.children }
          </div>
        </Content>
      </Layout>
    </Layout>;
  }
}

export default CmpLayout;
