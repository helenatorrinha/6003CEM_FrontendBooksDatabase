import React from 'react';
import { withRouter } from 'react-router';
import { Image, Row, Col, Typography } from 'antd'

const { Title, Paragraph } = Typography;

class Author extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      author: undefined
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id; // available using withRouter()
    this.setState({
      author: require('../data/authors.json')[id]
    })
  }

  render() {
    if (!this.state.author) {
      return <h3>Loading author...</h3>
    }
    const author = this.state.author;

    return (
      <div>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={6} align="center">
            <Image width={200} alt="Author" src={author.avatarURL} />
          </Col>
          <Col span={12}>
            <Title>{`${author.firstName} ${author.lastName}`}</Title>
            <Paragraph>Author ID: {author.id}</Paragraph>
            <Paragraph>{author.description}</Paragraph>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Author);
