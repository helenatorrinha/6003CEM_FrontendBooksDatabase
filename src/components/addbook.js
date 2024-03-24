import React from 'react';
import { Form, Input, Button, DatePicker, InputNumber } from 'antd';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import { withRouter } from 'react-router-dom'; 

// Layout configuration for the form
const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } },
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

// Validation rules for form fields
const TitleRules = [{ required: true, message: 'Please input the book\'s title!' }];
const AuthorNameRules = [
  { required: true, message: "Please input the author's name!" },
  { pattern: /^[a-zA-Z]+$/, message: 'Please input an acceptable name' },
];
const GenreRules = [
  { required: true, message: "Please input the book's genre!", whitespace: true },
];
const PublicationDateRules = [
  { required: true, message: "Please input the book's Publication Date!" },
];
const ISBNRules = [
  { required: true, message: "Please input the book's ISBN!" },
];

class AddBookForm extends React.Component {
  static contextType = UserContext; // Set the contextType to use UserContext within this class

  constructor(props) {
    super(props);
    this.onFinish = this.onFinish.bind(this);
  }

  onFinish(values) {
    const { publicationDate, ...rest } = values;
    const data = {
      ...rest,
      publicationDate: publicationDate ? publicationDate.format('YYYY-MM-DD') : undefined,
    };

    fetch('https://squaremember-decimalvalid-3030.codio-box.uk/api/v1/books/', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token"),
      },
    })
    .then(status)
    .then(json)
    .then(data => {
      alert("Book Added successfully!");
      this.props.history.push("/books/" + data.ID); 
    })
    .catch(error => {
      console.error('An error occurred while submitting the form', error);
      alert(`Error: ${error.error}`);
      document.querySelector('form').reset(); // Reset the form 
    });
  }

  render() {
    const { user } = this.context; // Accessing user from the context
    
    return (
      <>
        {user && user.role === "admin" ? (
          <Form {...formItemLayout} name="addbook" onFinish={this.onFinish} scrollToFirstError>
            <Form.Item name="title" label="Title" rules={TitleRules}>
              <Input />
            </Form.Item>

            <Form.Item name="firstname" label="Author's First Name" rules={AuthorNameRules}>
              <Input />
            </Form.Item>

            <Form.Item name="lastname" label="Author's Last Name" rules={AuthorNameRules}>
              <Input />
            </Form.Item>

            <Form.Item name="genre" label="Genre" rules={GenreRules}>
              <Input />
            </Form.Item>

            <Form.Item name="publicationDate" label="Publication Date" rules={PublicationDateRules}>
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item name="description" label="Description">
              <Input />
            </Form.Item>

            <Form.Item name="ISBN" label="ISBN" rules={ISBNRules}>
              <InputNumber />
            </Form.Item>

            <Form.Item name="imageURL" label="Image URL">
              <Input />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Add Book
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <h1>Access Denied</h1>
        )}
      </>
    );
  }
}

export default withRouter(AddBookForm);
