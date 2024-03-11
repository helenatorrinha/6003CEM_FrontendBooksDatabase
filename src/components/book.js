import React from 'react';
import { withRouter } from 'react-router';
import { Image, Row, Col, Typography } from 'antd'

const { Title, Paragraph } = Typography;

class Book extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      book: undefined
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id; // available using withRouter()
    this.setState({
      book: require('../data/books.json')[id]
    })
  }

  render() {
    if (!this.state.book) {
      return <h3>Loading book...</h3>
    }
    const book = this.state.book;

    return (
      <div>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={6} align="center">
            <Image width={200} alt="Book" src={book.imageURL} />
          </Col>
          <Col span={12}>
            <Title>{book.title}</Title>
            <Paragraph>Book ID: {book.id}</Paragraph>
            <Paragraph>Author: {book.author}</Paragraph>
            <Paragraph>Genre: {book.genre}</Paragraph>
            <Paragraph>ISBN: {book.ISBN}</Paragraph>
            <Paragraph>Publication Date: {book.publicationDate}</Paragraph>
            <Paragraph>{book.description}</Paragraph>
          </Col>
        </Row>
      </div>
    );
  }

}

export default withRouter(Book);
