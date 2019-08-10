import React from 'react';
import { Form, Input } from 'antd';

class ModifyUserInfo extends React.Component {
  changing = (e) => {
    const { name, value } = e.target;
    this.props.onChange && this.props.onChange({ [name]: value });
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const { name, age, job } = this.props.user;
    return <Form>
      <Form.Item
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        label="name"
      >
        {
          getFieldDecorator('name', {
            initialValue: name
          })(<Input name="name" onChange={(e, val) => this.changing(e, val)} />)
        }
      </Form.Item>
      <Form.Item
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        label="age"
      >
        {
          getFieldDecorator('age', {
            initialValue: age
          })(<Input name="age" onChange={(e, val) => this.changing(e, val)} />)
        }
      </Form.Item>
      <Form.Item
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        label="job"
      >
        {
          getFieldDecorator('job', {
            initialValue: job
          })(<Input name="job" onChange={(e, val) => this.changing(e, val)} />)
        }
      </Form.Item>
    </Form>;
  }
}

export default Form.create({ name: 'modify_user_info' })(ModifyUserInfo);
