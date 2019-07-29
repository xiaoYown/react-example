import React from 'react';
import {
  Radio, Checkbox, Button,
  Input, Form, Cascader
} from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
};

class CmpForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      radioVal: '', // 单选值
      checkboxVal: ['1', '2'], // 多选值
      checkboxOption: ['1', '2', '3', '4'], // 多选框列表
      cascaderOptions: [{
        value: 'city-1',
        label: '市-1',
        children: [
          { value: 'area-1', label: '区-1' },
          { value: 'area-2', label: '区-2' }
        ]
      }, {
        value: 'city-2',
        label: '市-2',
        children: [
          { value: 'area-1', label: '区-1' },
          { value: 'area-2', label: '区-2' }
        ]
      }, {
        value: 'city-3',
        label: '市-3',
        children: [
          { value: 'area-1', label: '区-1' },
          { value: 'area-2', label: '区-2' }
        ]
      }],
      cascaderVal: [], // 下拉框显示值
      inputVal: '' // 输入框值
    };
  }

  submit = () => {
    const { radioVal, checkboxVal, cascaderVal, inputVal } = this.state;
    console.log(`
      单选: ${radioVal},
      多选: ${JSON.stringify(checkboxVal)},
      下拉: ${cascaderVal},
      输入框: ${inputVal}
    `);
  }

  setFormData = () => {
    this.props.form.setFieldsValue({
      radio: 'A',
      checkbox: ['2', '3', '4'],
      input: '自动填充文本',
      cascader: ['city-1', 'area-1']
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render () {
    const { getFieldDecorator } = this.props.form;
    const {
      checkboxOption,
      radioVal,
      checkboxVal,
      cascaderVal,
      cascaderOptions,
      inputVal
    } = this.state;

    return (
      <div className="g-antd-demo">
        <Form {...formItemLayout} className="form" onSubmit={this.handleSubmit}>
          <Form.Item label="名称">
            {getFieldDecorator('input', {
              rules: [
                { pattern: /^[\u4e00-\u9fa5]+$/, message: '必须为中文字符' },
                { required: true, message: '名称不能为空!' }
              ],
              initialValue: inputVal
            })(
              <Input style={{ maxWidth: '400px' }} placeholder="empty" />
            )}
          </Form.Item>
          <Form.Item label="单选">
            {getFieldDecorator('radio', {
              rules: [{ required: true, message: '性别不能为空!' }],
              initialValue: radioVal
            })(
              <Radio.Group>
                <Radio value="A">男</Radio>
                <Radio value="B">女</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="下拉">
            {getFieldDecorator('cascader', {
              rules: [{ required: true, message: '地址不能为空!' }],
              initialValue: cascaderVal
            })(
              <Cascader style={{ maxWidth: '400px' }} options={cascaderOptions} />
            )}
          </Form.Item>
          <Form.Item label="多选">
            {getFieldDecorator('checkbox', { initialValue: checkboxVal })(
              <Checkbox.Group>
                {checkboxOption.map((item, index) => <Checkbox key={index} value={item}>{item}</Checkbox>)}
              </Checkbox.Group>
            )}
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 4 }}>
            <Button type="primary" htmlType="submit">提交</Button>
            <Button type="primary" style={{ marginLeft: '20px' }} onClick={this.setFormData}>填写</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
};

const WrappedForm = Form.create({
  name: 'form_demo'
})(CmpForm);

class ViewDemo extends React.Component {
  render () {
    return (
      <div><WrappedForm /></div>
    );
  }
};

export default ViewDemo;
