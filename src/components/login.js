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

class LoginForm extends React.Component {

  constructor(props) {
      super(props);
      this.login = this.login.bind(this);
  }
  
  login(values) {
    const {username, password} = values;
    console.log(`logging in user: ${username}`)
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
        localStorage.setItem('token', user.accessToken);
        console.log('Logged in successfully');
        alert("Login successful!");
        window.location.href = "/"; // Redirect to another page
    })
    .catch(error => {
      const showError = (errorMessage) => {
        console.error(errorMessage);
        alert(`Error: ${errorMessage}`);
      };

      const clearForm = () => {
        document.querySelector('form').reset(); // clear the form
      };

      // Call the functions to show error message and clear form
      showError('An error occurred while submitting the form');
      clearForm();
      alert(`Error: ${JSON.stringify(error)}`);

      console.log('Login failed');
    });  
  }
  
  render() {
    return (
      <Form {...formItemLayout} name="login" onFinish={this.login} scrollToFirstError >
      
        <Form.Item name="username" 
          label="Username" 
          rules= {[{ required: true, message: 'Please input your username!', whitespace: true }]} >
            <Input />
        </Form.Item>

        <Form.Item 
          name="password" 
          label="Password" 
          rules= {[{ required: true, message: 'Please input your password!' }]} >
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
  };
};

export default LoginForm;
