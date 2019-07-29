import React from 'react';
import { Table, Form, Input, Button, Row, Col } from 'antd';

// table datasource
const dataSource = (new Array(20).fill('')).map((v, i) => ({
  key: i,
  name: '用户-' + i,
  age: 16 + i,
  address: `西湖区湖底公园${i}号`
}));
/**
 * @param {number} col - 当前列
 * @param {object[]} grids - 合并单元格列表
 */
const CreateMergeFn = (col, grids) => {
  // 先检查合并是否有穿插
  return function (value, rowData, rowIndex) {
    const obj = {
      children: value,
      props: {}
    };
    grids.forEach(grid => {
      if (col >= grid.col.s && col <= grid.col.e &&
          rowIndex >= grid.row.s && rowIndex <= grid.row.e
      ) {
        if (grid.col.s === col && grid.row.s === rowIndex) {
          obj.props.rowSpan = grid.row.e - grid.row.s + 1;
          obj.props.colSpan = grid.col.e - grid.col.s + 1;
        } else {
          obj.props.colSpan = 0;
          obj.props.rowSpan = 0;
        }
      }
    });
    return obj;
  };
};

// 合并单元格初始范围
const mergeRange = [{
  col: { s: 0, e: 1 },
  row: { s: 2, e: 4 }
}];

const columns = [
  {
    title: '姓名',
    width: '33.33%',
    align: 'center',
    dataIndex: 'name',
    key: 'name',
    render: CreateMergeFn(0, mergeRange)
  },
  {
    title: '年龄',
    width: '33.33%',
    align: 'center',
    dataIndex: 'age',
    key: 'age',
    render: CreateMergeFn(1, mergeRange)
  },
  {
    title: '住址',
    width: '33.33%',
    align: 'center',
    dataIndex: 'address',
    key: 'address',
    render: CreateMergeFn(2, mergeRange)
  }
];

class CmpTable extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      columns,
      mergeRange
    };
  }

  changeRangeRandom = () => {
    // 随机生成
    let newColumns = JSON.parse(JSON.stringify(columns));
    let rowStart = Math.floor(Math.random() * 7);
    let colStart = Math.floor(Math.random() * 2);
    let rowNum = (10 - rowStart) * Math.random() + 1;

    let newMergeRange = [{
      row: { s: rowStart, e: rowStart + rowNum },
      col: { s: colStart, e: colStart + 1 }
    }];
    newColumns[0].render = CreateMergeFn(0, newMergeRange);
    newColumns[1].render = CreateMergeFn(1, newMergeRange);
    newColumns[2].render = CreateMergeFn(2, newMergeRange);
    this.setState({ columns: newColumns });
  }

  changeRange = (e) => {
    e.preventDefault();

    // 提交 form 表单生成
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        const { col, row } = values;

        let newMergeRange = [{
          col: { s: parseInt(col.s), e: parseInt(col.e) },
          row: { s: parseInt(row.s), e: parseInt(row.e) }
        }];
        console.log(newMergeRange);
        let newColumns = JSON.parse(JSON.stringify(columns));
        newColumns[0].render = CreateMergeFn(0, newMergeRange);
        newColumns[1].render = CreateMergeFn(1, newMergeRange);
        newColumns[2].render = CreateMergeFn(2, newMergeRange);
        this.setState({ columns: newColumns });
      }
    });
  }
  render () {
    const { getFieldDecorator } = this.props.form;
    const { col, row } = this.state.mergeRange[0];

    return (
      <div className="g-ant-table">
        {/* <Table dataSource={dataSource} columns={columns} scroll={{ y: 600 }} /> */}
        <h3>测试: </h3>
        <Table size="small" bordered dataSource={dataSource} columns={this.state.columns} />
        <Form onSubmit={this.changeRange}>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item label="起始行">
                {
                  getFieldDecorator('row.s', {
                    initialValue: row.s
                    // rules: [{
                    //   validator: (rule, value, back) => {
                    //     if (/[^\d]/.test(value)) {
                    //       back('只能输入数字');
                    //     } else if (parseInt(value)) {
                    //     } else {
                    //       back();
                    //     }
                    //   }
                    // }]
                  })(<Input />)
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="终止行">
                {
                  getFieldDecorator('row.e', {
                    initialValue: row.e
                  })(<Input />)
                }
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item label="起始列">
                {
                  getFieldDecorator('col.s', {
                    initialValue: col.s
                  })(<Input />)
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="终止列">
                {
                  getFieldDecorator('col.e', {
                    initialValue: col.e
                  })(<Input />)
                }
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <Button type="primary" htmlType="submit">修改范围</Button>
            </Col>
            <Col span={12}>
              <Button type="primary" onClick={this.changeRangeRandom}>随机合并</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const TableDynamic = Form.create({
  name: 'table_dynamic_form'
})(CmpTable);

export default TableDynamic;
