import React from 'react';
import { withRouter } from 'react-router';
import { Image, Row, Col, Typography } from 'antd'

const { Title, Paragraph } = Typography;

class Account extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      account: undefined
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id; // available using withRouter()
    this.setState({
      account: require('../data/users.json')[id]
    })
  }

  render() {
    if (!this.state.account) {
      return <h3>Loading user...</h3>
    }
    const account = this.state.account;

    return (
      <div>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={6} align="center">
            <Image width={200} alt="Account" src={account.avatarURL} />
          </Col>
          <Col span={12}>
            <Title>{`${account.firstName} ${account.lastName}`}</Title>
            <Paragraph>Username: {account.username}</Paragraph>
            <Paragraph>Email: {account.email}</Paragraph>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Account);
