import React from 'react';
import { Layout } from 'antd';
import CmpSider from './Sider';

const { Header, Content, Footer } = Layout;

class CmpLayout extends React.Component {
  render () {
    return <Layout>
      <CmpSider />
      <Layout style={{ marginLeft: 200, height: '100vh' }}>
        {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
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
