import React from 'react';
import { Form, Input, Button, DatePicker, InputNumber } from 'antd';
import { status, json } from '../utilities/requestHandlers';

// add some layout to keep the form organised on different screen sizes
const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

// Validation rules for the form fields
const TitleRules = [
  { required: true, message: 'Please input the books title!' }
];

const AuthorNameRules = [
  { required: true, message: "Please input the author's name!" },
  { pattern: /^[a-zA-Z]+$/, message: 'Please input an acceptable name' }
];

const GenreRules = [
  { required: true, message: "Please input the book's genre!", whitespace: true }
]
  
const PublicationDateRules = [
    {required: true, message: "Please input the book's Publication Date!" }
];

const ISBNRules = [
  { required: true, message: "Please input the book's ISBN!" }
];


/**
 * Registration form component for app signup.
 */
class AddBookForm extends React.Component {

  constructor(props) {
      super(props);
      this.onFinish = this.onFinish.bind(this);
  }
  
  onFinish = (values) => {
    const formData = { ...values };

    if (formData.publicationDate) { // If publicationDate exists
      formData.publicationDate = formData.publicationDate.format('YYYY-MM-DD');
    }

    const { confirm, ...data } = formData; 

    fetch('http://localhost:3030/api/v1/books/', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }        
    })
    .then(status)
    .then(json)
    .then(data => {
      alert("Book Added successfully!");
      window.location.href = "/books/" + data.ID; // Redirect to another page

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
        alert(`${JSON.stringify(error)}`);
    });  
  };
  
  render() {
    return (
      <Form {...formItemLayout} name="addbook" onFinish={this.onFinish} scrollToFirstError >
        
        <Form.Item name="title" label="Title" rules={TitleRules} >
            <Input />
        </Form.Item>

        <Form.Item name="firstname" label="Author's First Name" rules={AuthorNameRules} >
            <Input />
        </Form.Item>

        <Form.Item name="lastname" label="Author's Last Name" rules={AuthorNameRules} >
            <Input />
        </Form.Item>

        <Form.Item name="genre" label="Genre" rules={GenreRules} >
            <Input />
        </Form.Item>

        <Form.Item name="publicationDate" label="Publication Date" rules={PublicationDateRules}>
          <DatePicker
            format="YYYY-MM-DD"
          />
        </Form.Item>

        <Form.Item name="description" label="Description" >
            <Input />
        </Form.Item>

        <Form.Item name="ISBN" label="ISBN" rules={ISBNRules} >
            <InputNumber />
        </Form.Item>

        <Form.Item name="imageURL" label="Image URL" >
            <Input/>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
                Add Book
            </Button>
        </Form.Item>
      </Form>
    );
  };
};

export default AddBookForm;

