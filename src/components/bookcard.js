import React from 'react';
import { Card } from 'antd';
import NavImage from './navimage';
import defaultImage from '../data/unavailable.png';

const { Meta } = Card;

class BookCard extends React.Component {

  render() {
    const bookID = this.props.book_id;
    const bookImage = this.props.imageURL || defaultImage;
    return (
      <Card
        style={{ width: 320 }}
        cover={<NavImage alt={`Post ${bookID}`} src={bookImage} to={`/books/${bookID}`} />}
        hoverable={true}>
        
        <Meta title={this.props.title} description={this.props.summary} />
      </Card>
    );
  }
}

export default BookCard; 
