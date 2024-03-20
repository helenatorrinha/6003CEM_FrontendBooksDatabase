import React from 'react';
import { Form, Input, Button } from 'antd';
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
const AuthorNameRules = [
  { required: true, message: "Please input the author's name!" },
  { pattern: /^[a-zA-Z]+$/, message: 'Please input an acceptable name' },
];


class AddAuthorForm extends React.Component {
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

    fetch('http://localhost:3030/api/v1/authors/', {
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
      alert("Author Added successfully!");
      this.props.history.push("/authors/" + data.ID); 
    })
    .catch(error => {
      console.error('An error occurred while submitting the form', error);
      alert(`Error: ${error.message}`);
      document.querySelector('form').reset(); // Optionally reset the form on failure
    });
  }

  render() {
    const { user } = this.context; // Accessing user from the context
    
    return (
      <>
        {user && user.role === "admin" ? (
          <Form {...formItemLayout} name="addauthor" onFinish={this.onFinish} scrollToFirstError>
            <Form.Item name="firstName" label="Author's First Name" rules={AuthorNameRules}>
              <Input />
            </Form.Item>

            <Form.Item name="lastName" label="Author's Last Name" rules={AuthorNameRules}>
              <Input />
            </Form.Item>

            <Form.Item name="description" label="Description">
              <Input />
            </Form.Item>

            <Form.Item name="avatarURL" label="Avatar URL">
              <Input />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Add Author
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

export default withRouter(AddAuthorForm);
