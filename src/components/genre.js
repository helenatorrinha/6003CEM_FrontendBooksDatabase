import React from 'react';
import { withRouter } from 'react-router';
import { Row, Col, Typography } from 'antd'

const { Title, Paragraph } = Typography;

class Genre extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      genre: undefined
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id; // available using withRouter()
    this.setState({
        genre: require('../data/genres.json')[id]
    })
  }

  render() {
    if (!this.state.genre) {
      return <h3>Loading genre...</h3>
    }
    const genre = this.state.genre;

    return (
      <div>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={12}>
            <Title>{genre.name}</Title>
            <Paragraph>Genre ID: {genre.id}</Paragraph>
            <Paragraph>{genre.description}</Paragraph>
          </Col>
        </Row>
      </div>
    );
  }

}

export default withRouter(Genre);
