import React from 'react';
import { withRouter } from 'react-router';
import { Image, Row, Col, Typography, Spin, Alert, Button } from 'antd';
import defaultImage from '../data/unavailableImage.png'; 
import UserContext from '../contexts/user';

const { Title, Paragraph } = Typography;

class Account extends React.Component {
  static contextType = UserContext; // Set the contextType to use UserContext within this class

  constructor(props) {
    super(props);
    this.state = {
      account: undefined,
      loading: true, // Add loading state
      error: null // Add error state
    }
  }

  componentDidMount() {
     // Check if the user is logged in
     if (!this.context.user.loggedIn) {
      this.setState({ error: 'Access Denied. User is not logged in.', loading: false });
      return; // Exit early if the user is not logged in
    }

    const id = this.props.match.params.id; // available using withRouter()
    
    // Check if the user ID is undefined
    if (id === undefined) {
      this.setState({ error: 'Access Denied. No user ID provided.', loading: false });
      return; // Exit early if no user ID is provided
    }
    fetch(`http://localhost:3030/api/v1/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token"),
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch account details.');
      }
      return response.json();
    })
    .then(data => {
      this.setState({ account: data, loading: false });
    })
    .catch(error => {
      this.setState({ error: error.message, loading: false });
    });
  }

  handleEdit = () => {
    const { history, match } = this.props;
    const userId = match.params.id;
    history.push(`/users/edit/${userId}`);
  }

  render() {
    const { account, loading, error } = this.state;
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
    const accountImage = account && account.avatarURL ? account.avatarURL : defaultImage;

    return (
      <>
        {user.loggedIn ? (
        <div>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={6} align="center">
              <Image width={200} alt="Account" src={accountImage} />
            </Col>
            <Col span={12}>
              <Title>{`${account.firstName} ${account.lastName}`}</Title>
              <Paragraph>ID: {account.user_id}</Paragraph>
              <Paragraph>Username: {account.username}</Paragraph>
              <Paragraph>Email: {account.email}</Paragraph>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: '20px' }}>
            <Col>
              <Button type="primary" onClick={this.handleEdit}>Edit</Button>
            </Col>
          </Row>
        </div>
        ) : (
          <h1>Access Denied</h1>
        )}
      </>
    );
  }
}

export default withRouter(Account);
