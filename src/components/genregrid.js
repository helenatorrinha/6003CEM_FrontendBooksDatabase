import React from 'react';
import { Col, Row } from 'antd';
import GenreCard from './genrecard';

class GenreGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      genres: []
    }
  }

  componentDidMount() {
    this.setState({
        genres: require('../data/genresList.json')
    })
  }

  render() {
    if (!this.state.genres.length) {
      return <h3>Loading genres...</h3>
    }
    const cardList = this.state.genres.map(genre => {
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
