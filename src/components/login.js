import React from 'react';
import { Form, Input, Button } from 'antd';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import { withRouter } from 'react-router-dom'; 

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};

const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

class LoginForm extends React.Component {
  static contextType = UserContext; // Use contextType to assign UserContext to this component
  
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }
  
  login(values) {
    const {username, password} = values;
    console.log(`logging in user: ${username}`);
    fetch('http://localhost:3030/api/v1/login', {
        method: "POST",
        body: JSON.stringify({username, password}),
        headers: {
          "Content-Type": "application/json"
        }        
    })
    .then(status)
    .then(json)
    .then(user => {
        sessionStorage.setItem('token', user.accessToken);
        this.context.login({loggedIn: true, ...user}); // Use this.context to access UserContext
        console.log('Logged in successfully', this.context.user);
        alert("Login successful!");
        this.props.history.push("/");
    })
    .catch(error => {
      console.error('An error occurred while submitting the form', error);
      alert('Error: ' + error.error);
      document.querySelector('form').reset(); // clear the form
      console.log('Login failed');
    });  
  }
  
  render() {
    return (
      <Form {...formItemLayout} name="login" onFinish={this.login} scrollToFirstError>
        <Form.Item name="username" 
          label="Username" 
          rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}>
            <Input />
        </Form.Item>
        <Form.Item 
          name="password" 
          label="Password" 
          rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
                Login
            </Button>
            Or <a href="/register">Register here!</a>
        </Form.Item>
      </Form>
    );
  }
};

export default withRouter(LoginForm);
