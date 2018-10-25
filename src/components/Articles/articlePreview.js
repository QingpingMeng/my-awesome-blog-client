import React, { Component } from 'react';
import {
    Card,
    CardContent,
    CardActionArea,
    Typography
} from '@material-ui/core';
import moment from 'moment';
import 'github-markdown-css';
import { navigate } from "gatsby"

export default class ArticlePreview extends Component {
    onReadMore() {
        navigate(`/article/${this.props.slug}`)
    }

    render() {
        return (
            <Card raised={false}>
                <CardActionArea
                    role="link"
                    onClick={this.onReadMore}
                    style={{ width: '100%'}}
                >
                    <CardContent>
                        <Typography variant="title" style={{fontWeight: '600'}} gutterBottom={true}>
                            {this.props.title}
                        </Typography>

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
