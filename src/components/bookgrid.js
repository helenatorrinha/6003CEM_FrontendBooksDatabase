import React from 'react';
import { Col, Row, Spin, Alert } from 'antd';
import BookCard from './bookcard';

class BookGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      loading: true, // Add loading state
      error: null, // Add error state
    };
  }

  componentDidMount() {
    fetch('https://squaremember-decimalvalid-3030.codio-box.uk/api/v1/books', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Include the authorization token if your API requires authentication
        "Authorization": "Bearer " + sessionStorage.getItem("token"),
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch books.');
      }
      return response.json();
    })
    .then(data => {
      this.setState({ books: data, loading: false }); // Set books data and update loading state
    })
    .catch(error => {
      this.setState({ error: error.message, loading: false }); // Set error message and update loading state
    });
  }

  render() {
    const { books, loading, error } = this.state;

    // Display a spinner while the request is being made
    if (loading) {
      return <Spin size="large" />;
    }

    // Display an error message if an error occurred
    if (error) {
      return <Alert message="Error" description={error} type="error" showIcon />;
    }

    // Render the books if data is successfully fetched
    const cardList = books.map(book => (
      <div style={{padding: "10px"}} key={book.id}>
        <Col span={6}>
          <BookCard {...book} />
        </Col>
      </div>
    ));

    return (
      <Row type="flex" justify="space-around">
        {cardList}
      </Row>
    );
  }
}

export default BookGrid;
