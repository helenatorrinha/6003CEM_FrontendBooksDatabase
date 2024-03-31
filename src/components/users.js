import React from 'react';
import { Col, Row, Card, Spin, Alert } from 'antd';
import { Link } from 'react-router-dom';

class Users extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true, // Add loading state
      error: null, // Add error state
    }
  }

  componentDidMount() {
    // Call get users API
    fetch('https://squaremember-decimalvalid-3030.codio-box.uk/api/v1/users', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token"),
      },
    })
    .then(response => {
      console.log(response)
      if (response.status === 401 || response.status === 403) {
        throw new Error("You are not authorised.")
      }
      if (!response.ok) {
        throw new Error('Failed to fetch users.');
      }
      return response.json();
  
    })
    .then(data => {
      this.setState({ users: data, loading: false }); // Set users data and update loading state
    })
    .catch(error => {
      this.setState({ error: error.message, loading: false }); // Set error message and update loading state
    });
  }

  render() {
    const { users, loading, error } = this.state;

    // Display a spinner while the request is being made
    if (loading) {
      return <Spin size="large" />;
    }

    // Display an error message if an error occurred
    if (error) {
      return <Alert message="Error" description={error} type="error" showIcon />;
    }
    
    const cardList = users.map(user => {
      return (
        <div style={{padding:"10px"}} key={user.user_id}>
          <Col span={6}>
          <Link to={`/users/${user.user_id}`}>
            <Card
                style={{ width: 320 }}
                hoverable={true}>
                <h1>{`${user.firstName} ${user.lastName}`}</h1>
                <p>User ID: {user.user_id}</p>
                <p>username: {user.username}</p>
            </Card>
          </Link>
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

export default Users;

