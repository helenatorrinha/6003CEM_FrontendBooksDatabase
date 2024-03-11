import React from 'react';
import { Form, Input, Button } from 'antd';
import { status, json } from '../utilities/requestHandlers';

// add some layout to keep the form organised on different screen sizes
const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

// define validation rules for the form fields
const usernameRules = [
  { required: true, message: 'Please input your username!', whitespace: true }
]

const passwordRules = [
    { required: true, message: 'Please input your password!' }
];

class LoginForm extends React.Component {

  constructor(props) {
      super(props);
      this.onFinish = this.onFinish.bind(this);
  }
  
  onFinish = (values) => {
    console.log('Received values of form: ', values);
    const { confirm, ...data } = values;  // ignore the 'confirm' value in data sent
    fetch('http://localhost:3030/api/v1/users', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }        
    })
    .then(status)
    .then(json)
    .then(data => {
        // TODO: display success message and/or redirect
        console.log(data);
        alert("User added")
    })
    .catch(error => {
        // TODO: show nicely formatted error message and clear form
        alert(`Error: ${JSON.stringify(error)}`);
    });  
  };
  
  render() {
    return (
      <Form {...formItemLayout} name="register" onFinish={this.onFinish} scrollToFirstError >
      
        <Form.Item name="username" label="Username" rules={usernameRules} >
            <Input />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={passwordRules} hasFeedback >
            <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
                Login
            </Button>
        </Form.Item>
      </Form>
    );
  };
};

export default LoginForm;
