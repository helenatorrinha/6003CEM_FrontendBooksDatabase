import React from 'react';
import { Col, Row } from 'antd';
// import PostCard from './postcard';

class Grid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    this.setState({
      // posts: require('../data/postsList.json')
    })
  }

  render() {
    if (!this.state.posts.length) {
      return <h3>Loading posts...</h3>
    }
    const cardList = this.state.posts.map(post => {
      return (
        <div style={{padding:"10px"}} key={post.id}>
          <Col span={6}>
            {/* <PostCard {...post} /> */}
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

export default Grid;
