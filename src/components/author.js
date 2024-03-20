import React from 'react';
import { withRouter } from 'react-router';
import { Image, Row, Col, Typography, Spin, Alert, Button } from 'antd';
import defaultImage from '../data/unavailableImage.png'; 
import UserContext from '../contexts/user';

const { Title, Paragraph } = Typography;

class Author extends React.Component {
  static contextType = UserContext; // Set the contextType to use UserContext within this class

  constructor(props) {
    super(props);
    this.state = {
      author: undefined,
      loading: true, // Add loading state
      error: null // Add error state
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id; // available using withRouter()
    
    fetch(`http://localhost:3030/api/v1/authors/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token"),
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch author details.');
      }
      return response.json();
    })
    .then(data => {
      this.setState({ author: data, loading: false });
    })
    .catch(error => {
      this.setState({ error: error.message, loading: false });
    });
  }

  handleEdit = () => {
    const { history, match } = this.props;
    const authorId = match.params.id;
    history.push(`/authors/edit/${authorId}`);
  }

  handleDelete = () => {
    if(window.confirm('Are you sure you want to delete this author?')) {
      // Call delete API
      const id = this.props.match.params.id;
      fetch(`http://localhost:3030/api/v1/authors/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete author.');
        }
        return response.json();
      })
      .then(() => {
        alert('Author deleted successfully.');
        this.props.history.push('/');
      })
      .catch(error => {
        alert(error.message);
      });
    }
  }

  render() {
    const { author, loading, error } = this.state;
    const { user } = this.context; // Accessing user from the context

    // Display a spinner while the request is being made
    if (loading) {
      return <Spin size="large" />;
    }

    // Display an error message if an error occurred
    if (error) {
      return <Alert message="Error" description={error} type="error" showIcon />;
    }

    // Determine the author image URL or use the default image
    const authorImage = author && author.avatarURL ? author.avatarURL : defaultImage;

    return (
      <div>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={6} align="center">
            <Image width={200} alt="Author" src={authorImage} />
          </Col>
          <Col span={12}>
            <Title>{`${author.firstName} ${author.lastName}`}</Title>
            <Paragraph>Author ID: {author.author_id}</Paragraph>
            <Paragraph>{author.description}</Paragraph>
          </Col>
        </Row>
        <>
          {user && user.role === "admin" ?(
          <Row gutter={16} style={{ marginTop: '20px' }}>
            <Col>
              <Button type="primary" onClick={this.handleEdit}>Edit</Button>
            </Col>
            <Col>
              <Button type="danger" onClick={this.handleDelete}>Delete</Button>
            </Col>
          </Row>
          ):null}
        </>
      </div>
    );
  }
}

export default withRouter(Author);
