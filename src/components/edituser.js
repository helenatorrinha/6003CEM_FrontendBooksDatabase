import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { status, json } from '../utilities/requestHandlers';
import { withRouter } from 'react-router-dom'; 
import UserContext from '../contexts/user';

// define validation rules for the form fields
const firstNameRules = [
    {required: true, message: 'Please input your first name!' },
    { pattern: /^[a-zA-Z]+$/, message: 'Please input an acceptable name' }
  ];
  
  const lastNameRules = [
    {required: true, message: 'Please input your last name!' },
    { pattern: /^[a-zA-Z]+$/, message: 'Please input an acceptable name' }
  ];
  
  const usernameRules = [
    {required: true, message: 'Please input your username!' },
    { max: 15, message: 'keep between 4 and 16 characters' }
  ]
    
  const emailRules = [
      {type: 'email', message: 'The input is not valid E-mail!'},
      {required: true, message: 'Please input your E-mail!' }
  ];
  
  const passwordRules = [
      { min: 8, message: 'Password must be at least 8 characters long' }
  ];

function EditUser(props) {
  const [form] = Form.useForm();
  const { id } = useParams(); // Get genre ID from URL parameters
  const [loading, setLoading] = useState(false);
  const { user } = React.useContext(UserContext);

  useEffect(() => {
    // Fetch user details for editing
    fetch(`http://localhost:3030/api/v1/users/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          },
    })
      .then(response => response.json())
      .then(data => {
        // Set form fields with the data received
        form.setFieldsValue({
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            description: data.description,
            email: data.email
        });
      })
      .catch(error => {
        console.error('Failed to fetch user details:', error);
        message.error('Failed to fetch user details');
      });
  }, [id, form]);

  const handleSubmit = (values) => {
    if (!values.avatarURL) {
        delete values.avatarURL;
    }
    if (!values.description) {
        delete values.description;
    }
    if (!values.password) {
        delete values.password;
    }
    fetch(`http://localhost:3030/api/v1/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      },
      body: JSON.stringify(values),
    })
    .then(status)
    .then(json)
    .then(response => {
      alert("User Updated successfully!");
      props.history.push("/users/" + id);
    })
    .catch(error => {
      const showError = (errorMessage) => {
        console.error(errorMessage);
        alert(`Error: ${errorMessage}`);
      };

      // Call the functions to show error message and clear form
      showError('An error occurred while submitting the form');
      console.error('An error occurred while submitting the form', error);
    })
    .finally(() => setLoading(false));
  };

  return (
    <>
    { user.loggedIn ? (
      <Form form={form} onFinish={handleSubmit} layout="vertical">
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

          <Form.Item name="password" label="Password" rules={passwordRules} >
              <Input.Password />
          </Form.Item>

          <Form.Item name="avatarURL" label="Avatar URL" >
              <Input />
          </Form.Item>

          <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    ) : (
      <h1>Access Denied</h1>
    )}
    </>
  );
}

export default withRouter(EditUser);
