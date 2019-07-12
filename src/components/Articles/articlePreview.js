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
import { Button } from '@material-ui/core';

const PlainLink = styled(Link)`
    color: inherit;
    text-decoration: none;
`;

const Overlay = styled.div`
    right: 1rem;
    top: 1rem;
    position: absolute;
    z-index: 1;
`;

export default class ArticlePreview extends Component {
    render() {
        return (
            <Card raised={false}>
                <CardContent>
                    <Typography align="right" color="textSecondary">
                        {moment(this.props.createdAt).fromNow()}
                    </Typography>
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

                <CardActionArea style={{ width: '100%' }}>
                    <CardContent>
                        <Typography
                            gutterBottom={true}
                            color="textSecondary"
                            variant="subheading"
                        >
                            {this.props.summary ||
                                `This article doesn't have any summary.`}
                        </Typography>
                    </CardContent>
                    <Overlay>
                        <Button
                            variant="contained"
                            color="secondary"
                            to={`/articles/${this.props.slug}`}
                            component={PlainLink}
                        >
                            Read
                        </Button>
                    </Overlay>
                </CardActionArea>
            </Card>
        );
    }
}
