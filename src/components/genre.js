import React from 'react';
import { withRouter } from 'react-router';
import { Row, Col, Typography, Spin, Alert, Button } from 'antd';
import UserContext from '../contexts/user';

const { Title, Paragraph } = Typography;

class Genre extends React.Component {
  static contextType = UserContext; // Set the contextType to use UserContext within this class

  constructor(props) {
    super(props);
    this.state = {
      genre: undefined,
      loading: true, // Add loading state
      error: null // Add error state
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id; // available using withRouter()
    
    fetch(`http://localhost:3030/api/v1/genres/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token"),
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch genre details.');
      }
      return response.json();
    })
    .then(data => {
      this.setState({ genre: data, loading: false });
    })
    .catch(error => {
      this.setState({ error: error.message, loading: false });
    });
  }

  handleEdit = () => {
    const { history, match } = this.props;
    const genreId = match.params.id;
    history.push(`/genres/edit/${genreId}`);
  }

  handleDelete = () => {
    if(window.confirm('Are you sure you want to delete this genre?')) {
      // Call delete API
      const id = this.props.match.params.id;
      fetch(`http://localhost:3030/api/v1/genres/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete genre.');
        }
        return response.json();
      })
      .then(() => {
        alert('Genre deleted successfully.');
        this.props.history.push('/');
      })
      .catch(error => {
        alert(error.message);
      });
    }
  }

  render() {
    const { genre, loading, error } = this.state;
    const { user } = this.context; // Accessing user from the context

    // Display a spinner while the request is being made
    if (loading) {
      return <Spin size="large" />;
    }

    // Display an error message if an error occurred
    if (error) {
      return <Alert message="Error" description={error} type="error" showIcon />;
    }

    return (
      <div>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={12}>
            <Title>{genre.name}</Title>
            <Paragraph>Genre ID: {genre.genre_id}</Paragraph>
            <Paragraph>{genre.description}</Paragraph>
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

export default withRouter(Genre);
