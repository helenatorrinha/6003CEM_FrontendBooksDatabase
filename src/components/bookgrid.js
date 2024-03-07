import React from 'react';
import { Col, Row } from 'antd';
import BookCard from './bookcard';

class BookGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    this.setState({
        books: require('../data/booksList.json')
    })
  }

  render() {
    if (!this.state.books.length) {
      return <h3>Loading books...</h3>
    }
    const cardList = this.state.books.map(book => {
      return (
        <div style={{padding:"10px"}} key={book.id}>
          <Col span={6}>
            <BookCard {...book} />
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

export default BookGrid;
