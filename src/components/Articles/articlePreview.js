import React, { Component } from 'react';
import {
    Card,
    CardContent,
    CardActions,
    Button,
    CardActionArea,
    Typography
} from '@material-ui/core';
import moment from 'moment';
// import CardActionArea from '@material-ui/core/CardActionArea';
import 'github-markdown-css';

export default class ArticlePreview extends Component {
    render() {
        return (
            <Card>
                <CardActionArea onClick={this.props.onReadMore} style={{ width: '100%' }}>
                    <CardContent>
                        <Typography align='right' color="textSecondary">
                        {moment.utc(this.props.createdAt).fromNow()}
                        </Typography>
                        <div
                            className={`markdown-body`}
                            dangerouslySetInnerHTML={{
                                __html: this.props.previewBody
                            }}
                        />
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button onClick={this.props.onReadMore} size="small" color="primary">
                        Read More
                    </Button>
                </CardActions>
            </Card>
        );
    }
}
