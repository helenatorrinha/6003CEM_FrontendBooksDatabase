import React from 'react';
import { Col, Row, Card } from 'antd';
import { Link } from 'react-router-dom';

class Users extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    this.setState({
        users: require('../data/usersList.json')
    })
  }

  render() {
    if (!this.state.users.length) {
      return <h3>Loading users...</h3>
    }
    const cardList = this.state.users.map(user => {
      return (
        <div style={{padding:"10px"}} key={user.id}>
          <Col span={6}>
          <Link to={`/users/${user.id}`}>
            <Card
                style={{ width: 320 }}
                hoverable={true}>
                <h1>{`${user.firstName} ${user.lastName}`}</h1>
                <p>User ID: {user.id}</p>
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

