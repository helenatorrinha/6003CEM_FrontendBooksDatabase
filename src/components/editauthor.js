import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { status, json } from '../utilities/requestHandlers';
import { withRouter } from 'react-router-dom'; 
import UserContext from '../contexts/user';

function EditAuthor(props) {
  const [form] = Form.useForm();
  const { id } = useParams(); // Get author ID from URL parameters
  const [loading, setLoading] = useState(false);
  const { user } = React.useContext(UserContext);

  useEffect(() => {
    // Call get author by id API
    fetch(`https://squaremember-decimalvalid-3030.codio-box.uk/api/v1/authors/${id}`)
      .then(response => response.json())
      .then(data => {
        // Set form fields with the data received
        form.setFieldsValue({
          firstName: data.firstName,
          lastName: data.lastName,
          description: data.description,
          avatarURL: data.avatarURL
        });
      })
      .catch(error => {
        console.error('Failed to fetch author details:', error);
        message.error('Failed to fetch author details');
      });
  }, [id, form]);

  const handleSubmit = (values) => {
    if (!values.avatarURL) {
        delete values.avatarURL;
    }
    if (!values.description) {
        delete values.description;
    }
    // Call put/update author API
    fetch(`https://squaremember-decimalvalid-3030.codio-box.uk/api/v1/authors/${id}`, {
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
      alert("Author Updated successfully!");
      props.history.push("/authors/" + id);
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
     {user.role === 'admin' ? (
      <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="firstName" label="Author's First Name" rules={[{ required: true }]}>
              <Input />
          </Form.Item>

          <Form.Item name="lastName" label="Author's Last Name" rules={[{ required: true }]}>
              <Input />
          </Form.Item>

          <Form.Item name="description" label="Description">
              <Input />
          </Form.Item>

          <Form.Item name="avatarURL" label="Avatar URL">
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

export default withRouter(EditAuthor);
