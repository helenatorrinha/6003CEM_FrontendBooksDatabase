import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { status, json } from '../utilities/requestHandlers';
import { withRouter } from 'react-router-dom'; 
import UserContext from '../contexts/user';

const NameRules = [
    { required: true, message: "Please input the genre's name!" },
    { pattern: /^[a-zA-Z]+$/, message: 'Please input an acceptable name' },
  ];

function EditGenre(props) {
  const [form] = Form.useForm();
  const { id } = useParams(); // Get genre ID from URL parameters
  const [loading, setLoading] = useState(false);
  const { user } = React.useContext(UserContext);

  useEffect(() => {
    // Call get genre by id API
    fetch(`https://squaremember-decimalvalid-3030.codio-box.uk/api/v1/genres/${id}`)
      .then(response => response.json())
      .then(data => {
        // Set form fields with the data received
        form.setFieldsValue({
          name: data.name,
          description: data.description
        });
      })
      .catch(error => {
        console.error('Failed to fetch genre details:', error);
        message.error('Failed to fetch genre details');
      });
  }, [id, form]);

  const handleSubmit = (values) => {
    if (!values.avatarURL) {
        delete values.avatarURL;
    }
    if (!values.description) {
        delete values.description;
    }
    // Call put/update genre API
    fetch(`https://squaremember-decimalvalid-3030.codio-box.uk/api/v1/genres/${id}`, {
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
      alert("Genre Updated successfully!");
      props.history.push("/genres/" + id);
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
          <Form.Item name="name" label="Genre Name" rules={NameRules}>
                <Input />
              </Form.Item>

              <Form.Item name="description" label="Description">
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

export default withRouter(EditGenre);
