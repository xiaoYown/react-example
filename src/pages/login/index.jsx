import React from 'react';
import { render } from 'react-dom';
import { isLogin, redirectQuery } from '@/utils';
import { Input, Form } from 'antd';
import '@/assets/sass/login/main.scss';

class Login extends React.Component {
  componentWillMount () {
    if (isLogin()) {
      redirectQuery('back_url', '/home', 'replace');
    }
  }

  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        window.sessionStorage.setItem('name', values.name);
        redirectQuery('back_url');
      }
    });
  }

  render () {
    const { getFieldDecorator } = this.props.form;

    if (isLogin()) {
      redirectQuery('back_url', '/home', 'replace');
      return '';
    } else {
      return <Form
        style={{
          width: '400px',
          margin: '200px auto'
        }}
      >
        <Form.Item>
          {
            getFieldDecorator('name', {
              rules: [{ required: true, message: 'must' }]
            })(<Input placeholder="输入昵称后按下 Enter" onPressEnter={this.submit}/>)
          }
        </Form.Item>
      </Form>;
    }
  }
}

const WrapperLogin = Form.create({ name: 'login' })(Login);

render(
  <WrapperLogin/ >,
  document.getElementById('g-login')
);

if (module.hot) {
  module.hot.accept();
}
