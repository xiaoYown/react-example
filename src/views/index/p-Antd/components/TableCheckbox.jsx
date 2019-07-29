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
    key: 'age'
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
  onSelect = (record, selected, selectedRows, nativeEvent) => {
    console.log(record, selected, selectedRows, nativeEvent);
  }
  onSelectAll = (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  }
  onSelectInvert = (selectedRows) => {
    console.log(selectedRows);
  }
  onChange = (selectedRowKeys, selectedRows) => {
    console.log(selectedRowKeys, selectedRows);
  }
  render () {
    return (
      <div>
        <Table
          rowSelection={{
            // onSelect: this.onSelect,
            // onSelectAll: this.onSelectAll,
            // onSelectInvert: this.onSelectInvert,
            onChange: this.onChange
          }}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

export default CmpTable;
