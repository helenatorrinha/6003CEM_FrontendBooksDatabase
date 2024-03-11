import React from 'react';
import { Card } from 'antd';
import NavImage from './navimage';

const { Meta } = Card;

class AuthorCard extends React.Component {

    render() {
        const authorID = this.props.id;
        return (
            <Card
                style={{ width: 320 }}
                cover={<NavImage alt={`Author ${authorID}`} src={this.props.avatarURL} to={`/authors/${authorID}`} />}
                hoverable={true}>
                
                <Meta title={`${this.props.firstName} ${this.props.lastName}`} />
            </Card>
        );
    }
}

export default AuthorCard; 
