import React from 'react';
import { Col, Row, Spin, Alert} from 'antd';
import AuthorCard from './authorcard';

class AuthorGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authors: [],
      loading: true, // Add loading state
      error: null, // Add error state
    }
  }

  componentDidMount() {
    // Call get authors API
    fetch('https://squaremember-decimalvalid-3030.codio-box.uk/api/v1/authors', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token"),
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch authors.');
      }
      return response.json();
    })
    .then(data => {
      this.setState({ authors: data, loading: false }); // Set authors data and update loading state
    })
    .catch(error => {
      this.setState({ error: error.message, loading: false }); // Set error message and update loading state
    });
  }

  render() {
    const { authors, loading, error } = this.state;

    // Display a spinner while the request is being made
    if (loading) {
      return <Spin size="large" />;
    }

    // Display an error message if an error occurred
    if (error) {
      return <Alert message="Error" description={error} type="error" showIcon />;
    }

    const cardList = authors.map(author => {
      return (
        <div style={{padding:"10px"}} key={author.id}>
          <Col span={6}>
            <AuthorCard {...author} />
          </Col>
        </div>
      )
    });

    return (
      <Row type="flex" justify="space-around">
        {cardList}
      </Row>
    );
  }
}

export default AuthorGrid;
