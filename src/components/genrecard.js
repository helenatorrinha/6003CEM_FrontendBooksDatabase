import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

class GenreCard extends React.Component {

  render() {
    const genreID = this.props.genre_id;
    return (
      <Link to={`/genres/${genreID}`}>
        <Card
          style={{ width: 320 }}
          hoverable={true}>
          <p>{this.props.name} </p>
        </Card>
      </Link>
    );
  }
}

export default GenreCard; 
