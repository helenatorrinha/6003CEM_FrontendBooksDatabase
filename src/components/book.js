import React from 'react';
import { withRouter } from 'react-router';
import { Image, Row, Col, Typography, Spin, Alert, Button } from 'antd';
import defaultImage from '../data/unavailable.png'; 
import UserContext from '../contexts/user';

const { Title, Paragraph } = Typography;

class Book extends React.Component {
  static contextType = UserContext; // Set the contextType to use UserContext within this class

  constructor(props) {
    super(props);
    this.state = {
      book: undefined,
      loading: true, // Add loading state
      error: null, // Add error state
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id; // available using withRouter()
    
    fetch(`http://localhost:3030/api/v1/books/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token"),
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch book details.');
      }
      return response.json();
    })
    .then(data => {
      this.setState({ book: data, loading: false });
    })
    .catch(error => {
      this.setState({ error: error.message, loading: false });
    });
  }
  
  handleEdit = () => {
    const { history, match } = this.props;
    const bookId = match.params.id;
    history.push(`/books/edit/${bookId}`);
  }
  
  handleDelete = () => {
    if(window.confirm('Are you sure you want to delete this book?')) {
      // Call delete API
      const id = this.props.match.params.id;
      fetch(`http://localhost:3030/api/v1/books/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete book.');
        }
        return response.json();
      })
      .then(() => {
        alert('Book deleted successfully.');
        this.props.history.push('/');
      })
      .catch(error => {
        alert(error.message);
      });
    }
  }
  
  render() {
    const { book, loading, error } = this.state;
    const { user } = this.context; // Accessing user from the context

    // Display a spinner while the request is being made
    if (loading) {
      return <Spin size="large" />;
    }

    // Display an error message if an error occurred
    if (error) {
      return <Alert message="Error" description={error} type="error" showIcon />;
    }

    // Determine the book image URL or use the default image
    const bookImage = book && book.imageURL ? book.imageURL : defaultImage;

    // If the data is successfully fetched, render the book details
    return (
      <div>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={6} align="center">
            {/* Use `bookImage` as the source for the image */}
            <Image width={200} alt="Book" src={bookImage} />
          </Col>
          <Col span={12}>
            <Title>{book ? book.title : 'Loading...'}</Title>
            <Paragraph>Book ID: {book ? book.book_id : ''}</Paragraph>
            <Paragraph>Author: {book ? `${book.author_firstName} ${book.author_lastName}` : ''}</Paragraph>
            <Paragraph>Genre: {book ? book.genre_name : ''}</Paragraph>
            <Paragraph>ISBN: {book ? book.ISBN : ''}</Paragraph>
            <Paragraph>Publication Date: {book ? book.publicationDate : ''}</Paragraph>
            <Paragraph>{book ? book.description : ''}</Paragraph>
          </Col>

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
        </Row>
      </div>
    );
  }
}

export default withRouter(Book);
