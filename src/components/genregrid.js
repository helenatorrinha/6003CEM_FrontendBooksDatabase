import React from 'react';
import { Col, Row, Spin, Alert} from 'antd';
import GenreCard from './genrecard';

class GenreGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      loading: true, // Add loading state
      error: null, // Add error state
    }
  }

  componentDidMount() {
    fetch('http://localhost:3030/api/v1/genres', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Include the authorization token if your API requires authentication
        "Authorization": "Bearer " + sessionStorage.getItem("token"),
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch genres.');
      }
      return response.json();
    })
    .then(data => {
      this.setState({ genres: data, loading: false }); // Set genres data and update loading state
    })
    .catch(error => {
      this.setState({ error: error.message, loading: false }); // Set error message and update loading state
    });
  }

  render() {
    const { genres, loading, error } = this.state;

    // Display a spinner while the request is being made
    if (loading) {
      return <Spin size="large" />;
    }

    // Display an error message if an error occurred
    if (error) {
      return <Alert message="Error" description={error} type="error" showIcon />;
    }

    const cardList = genres.map(genre => {
      return (
        <div style={{padding:"10px"}} key={genre.id}>
          <Col span={6}>
            <GenreCard {...genre} />
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

export default GenreGrid;
