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

const firstNameRules = [
  { required: true, message: 'Please input your first name!' },
  { pattern: /^[a-zA-Z]+$/, message: 'Please input an acceptable name' }
];

const lastNameRules = [
  { required: true, message: 'Please input your last name!' },
  { pattern: /^[a-zA-Z]+$/, message: 'Please input an acceptable name' }
];

const usernameRules = [
  { required: true, message: 'Please input your username!', whitespace: true },
  { max: 15, message: 'keep between 4 and 16 characters' }
]
  
const emailRules = [
    {type: 'email', message: 'The input is not valid E-mail!'},
    {required: true, message: 'Please input your E-mail!' }
];

const passwordRules = [
    { required: true, message: 'Please input your password!' },
    { min: 8, message: 'Password must be at least 8 characters long' }
];

const confirmRules = [
    { required: true, message: 'Please confirm your password!' },
    // rules can include function handlers in which you can apply additional logic
    ({ getFieldValue }) => ({
        validator(rule, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject('The two passwords that you entered do not match!');
        }
    })
];


/**
 * Registration form component for app signup.
 */
class RegistrationForm extends React.Component {

  constructor(props) {
      super(props);
      this.onFinish = this.onFinish.bind(this);
  }
  
  onFinish = (values) => {
    console.log('Received values of form: ', values);
    const { confirm, ...data } = values;  // ignore the 'confirm' value in data sent
    fetch('http://localhost:3030/api/v1/users/', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }        
    })
    .then(status)
    .then(json)
    .then(data => {
        alert("Registration successful!");
        window.location.href = "/login"; // Redirect to another page

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
    });  
  };
  
  render() {
    return (
      <Form {...formItemLayout} name="register" onFinish={this.onFinish} scrollToFirstError >
        
        <Form.Item name="firstName" label="First Name" rules={firstNameRules} >
            <Input />
        </Form.Item>

        <Form.Item name="lastName" label="Last Name" rules={lastNameRules} >
            <Input />
        </Form.Item>

        <Form.Item name="username" label="Username" rules={usernameRules} >
            <Input />
        </Form.Item>

        <Form.Item name="email" label="E-mail" rules={emailRules} >
            <Input />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={passwordRules} hasFeedback >
            <Input.Password />
        </Form.Item>

        <Form.Item name="confirm" label="Confirm Password" dependencies={['password']}
            hasFeedback rules={confirmRules}>
            <Input.Password />
        </Form.Item>

        <Form.Item name="avatarURL" label="Avatar URL" >
            <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
                Register
            </Button>
        </Form.Item>
      </Form>
    );
  };
};

export default RegistrationForm;
