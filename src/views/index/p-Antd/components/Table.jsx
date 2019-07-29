import React from 'react';
import { Tabs } from 'antd';

import TableStatic from './TableStatic';
import TableDynamic from './TableDynamic';
import TableCheckbox from './TableCheckbox';

const { TabPane } = Tabs;

class ViewTable extends React.Component {
  state = {
    view: 'checkbox'
  }
  callback = (val) => {
    this.props.history.push(`/m/index/antd/table/${val}`);
  }
  render () {
    const { view } = this.state;
    return (
      <Tabs
        className="g-ant-table"
        defaultActiveKey={view}
        onChange={this.callback}
      >
        <TabPane tab="静态" key="static">
          <TableStatic />
        </TabPane>
        <TabPane tab="动态" key="dynamic">
          <TableDynamic />
        </TabPane>
        <TabPane tab="多选" key="checkbox">
          <TableCheckbox />
        </TabPane>
      </Tabs>
    );
  }
}
export default ViewTable;
