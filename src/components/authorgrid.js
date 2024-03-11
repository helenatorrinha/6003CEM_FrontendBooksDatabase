import React from 'react';
import { Col, Row } from 'antd';
import AuthorCard from './authorcard';

class AuthorGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authors: []
    }
  }

  componentDidMount() {
    this.setState({
        authors: require('../data/authorsList.json')
    })
  }

  render() {
    if (!this.state.authors.length) {
      return <h3>Loading authors...</h3>
    }
    const cardList = this.state.authors.map(author => {
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
