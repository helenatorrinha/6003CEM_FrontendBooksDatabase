import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input, Button, message, DatePicker, InputNumber } from 'antd';
import { status, json } from '../utilities/requestHandlers';
import { withRouter } from 'react-router-dom'; 
import UserContext from '../contexts/user';

function EditBook(props) {
  const [form] = Form.useForm();
  const { id } = useParams(); // Get book ID from URL parameters
  const [loading, setLoading] = useState(false);
  const { user } = React.useContext(UserContext);

  useEffect(() => {
    // Fetch book details for editing
    fetch(`http://localhost:3030/api/v1/books/${id}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      }
    })
      .then(response => response.json())
      .then(data => {
        // Set form fields with the data received
        form.setFieldsValue({
          title: data.title,
          author: data.author_firstName + ' ' + data.author_lastName,
          genre: data.genre_name,
          description: data.description,
          imageURL: data.imageURL,
          ISBN: data.ISBN
        });
      })
      .catch(error => {
        console.error('Failed to fetch book details:', error);
        message.error('Failed to fetch book details');
      });
  }, [id, form]);

  const handleSubmit = (values) => {
    Object.keys(values).forEach(key => values[key] === undefined || values[key] === null ? delete values[key] : {});
    values.ISBN = parseInt(values.ISBN)
    // Format publicationDate and adjust author name if necessary
    if (values.publicationDate) {
      values.publicationDate = values.publicationDate.format('YYYY-MM-DD');
    }
    else {
      delete values.publicationDate;
    }

    if (values.author && values.author.includes(' ')) {
      const [firstName, lastName] = values.author.split(' ');
      values.firstname = firstName;
      values.lastname = lastName;
      delete values.author;
    }

    fetch(`http://localhost:3030/api/v1/books/${id}`, {
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
      alert("Book Updated successfully!");
      props.history.push("/books/" + id);
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
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="author" label="Author" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="genre" label="Genre" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="publicationDate" label="Publication Date">
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="ISBN" label="ISBN" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="imageURL" label="Image URL">
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

export default withRouter(EditBook);
