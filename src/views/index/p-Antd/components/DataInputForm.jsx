import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

function hasErrors (fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

// class HorizontalLoginForm extends React.Component {
//   componentDidMount () {
//     // To disabled submit button at the beginning.
//     this.props.form.validateFields();
//   }

//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.form.validateFields((err, values) => {
//       if (!err) {
//         console.log('Received values of form: ', values);
//       };
//     });
//   };

//   render () {
//     const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

//     // Only show error after a field is touched.
//     const usernameError = isFieldTouched('username') && getFieldError('username');
//     const passwordError = isFieldTouched('password') && getFieldError('password');
//     return (
//       <Form layout="inline" onSubmit={this.handleSubmit}>
//         <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
//           {getFieldDecorator('username', {
//             rules: [{ required: true, message: 'Please input your username!' }]
//           })(
//             <Input
//               prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
//               placeholder="Username"
//             />
//           )}
//         </Form.Item>
//         <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
//           {getFieldDecorator('password', {
//             rules: [{ required: true, message: 'Please input your Password!' }]
//           })(
//             <Input
//               prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
//               type="password"
//               placeholder="Password"
//             />
//           )}
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
//             Log in
//           </Button>
//         </Form.Item>
//       </Form>
//     );
//   }
// };

const defaultValue = {
  username: 'user-xxx',
  password: 'password-xxxxxx'
};

class NormalLoginForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
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

    return (
      <div className="g-NormalLoginForm">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
              initialValue: defaultValue.username
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
              initialValue: defaultValue.password
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default { NormalLoginForm };
