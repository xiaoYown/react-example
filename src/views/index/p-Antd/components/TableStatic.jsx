import React from 'react';
import { Table } from 'antd';

// table datasource
const dataSource = (new Array(20).fill('')).map((v, i) => ({
  key: i,
  name: '用户-' + i,
  age: 16 + i,
  address: `西湖区湖底公园${i}号`
}));
// table column
const columns = [
  {
    title: '姓名',
    width: '33.33%',
    align: 'center',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '年龄',
    width: '33.33%',
    align: 'center',
    dataIndex: 'age',
    key: 'age',
    render: (value, row, index) => {
      const obj = {
        children: value,
        props: {}
      };
      if (index === 0) {
        obj.props.rowSpan = 2;
      }
      if (index === 1) {
        obj.props.rowSpan = 0;
      }
      return obj;
    }
  },
  {
    title: '住址',
    width: '33.33%',
    align: 'center',
    dataIndex: 'address',
    key: 'address'
  }
];

class CmpTable extends React.Component {
  render () {
    return (
      <div>
        <Table bordered dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}

export default CmpTable;
