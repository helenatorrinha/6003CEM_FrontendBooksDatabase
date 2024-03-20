import React from 'react';
import { Card } from 'antd';
import NavImage from './navimage';
import defaultImage from '../data/unavailableImage.png';

const { Meta } = Card;

class AuthorCard extends React.Component {

    render() {
        const authorID = this.props.author_id;
        const avatarURL = this.props.avatarURL || defaultImage;
        return (
            <Card
                style={{ width: 320 }}
                cover={<NavImage alt={`Author ${authorID}`} src={avatarURL} to={`/authors/${authorID}`} />}
                hoverable={true}>
                
                <Meta title={`${this.props.firstName} ${this.props.lastName}`} />
            </Card>
        );
    }
}

export default AuthorCard; 
