import React from 'react';
import { Card } from 'antd';
import NavImage from './navimage';

const { Meta } = Card;

class BookCard extends React.Component {

  render() {
    const bookID = this.props.id;
    return (
      <Card
        style={{ width: 320 }}
        cover={<NavImage alt={`Post ${bookID}`} src={this.props.imageURL} to={`/books/${bookID}`} />}
        hoverable={true}>
        
        <Meta title={this.props.title} description={this.props.summary} />
      </Card>
    );
  }
}

export default BookCard; 
