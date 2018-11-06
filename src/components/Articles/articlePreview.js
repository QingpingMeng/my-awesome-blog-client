import React, { Component } from 'react';
import {
    Card,
    CardContent,
    CardActionArea,
    Typography
} from '@material-ui/core';
import moment from 'moment';
import { Link } from 'react-router-dom';
import 'github-markdown-css';
import styled from 'styled-components';

const PlainLink = styled(Link)`
    color: inherit;
    text-decoration: none;
`;

export default class ArticlePreview extends Component {
    render() {
        return (
            <Card raised={false}>
                <CardContent>
                    <Typography
                        variant="title"
                        style={{ fontWeight: '600' }}
                        gutterBottom={true}
                    >
                        <PlainLink to={`/articles/${this.props.slug}`}>
                            {this.props.title}
                        </PlainLink>
                    </Typography>
                </CardContent>

                <CardActionArea
                    onClick={this.props.onReadMore}
                    style={{ width: '100%' }}
                >
                    <CardContent>
                        <Typography
                            gutterBottom={true}
                            color="textSecondary"
                            variant="subheading"
                        >
                            {this.props.summary ||
                                `This article doesn't have any summary.`}
                        </Typography>
                        <Typography align="right" color="textSecondary">
                            {moment(this.props.createdAt).fromNow()}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}
