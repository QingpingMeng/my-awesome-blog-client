import React, { Component } from 'react';
import gql from 'graphql-tag';
import 'github-markdown-css';
import { Query } from 'react-apollo';
import { Paper, Typography, Button } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withRouter } from 'react-router';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import Prism from 'prismjs';
import './articleDetail.css';
import DeleteArticleButton from '../../components/Articles/deleteArticleButton';

export const ARTICLE_DETAIL_QUERY = gql`
    query GetArticle($condition: String!) {
        queryArticle(condition: $condition) {
            body
            title
            createdAt
        }
    }
`;

class ArticleDetail extends Component {
    onDeletedSuccess = () => {
        this.props.history.replace('/');
    };

    render() {
        const slug = this.props.match.params.slug;
        return (
            <Query
                query={ARTICLE_DETAIL_QUERY}
                variables={{
                    condition: JSON.stringify({
                        slug: slug
                    })
                }}
            >
                {({ loading, error, data }) => {
                    if (loading) {
                        return (
                            <Paper elevation={1}>
                                <LinearProgress />
                            </Paper>
                        );
                    }

                    if (!data.queryArticle) {
                        return (
                            <div
                                style={{
                                    padding: '2rem'
                                }}
                                ref={element =>
                                    element && Prism.highlightAllUnder(element)
                                }
                                className="markdown-body"
                                dangerouslySetInnerHTML={{
                                    __html: `<h1>Article not found</h1>`
                                }}
                            />
                        );
                    }

                    return (
                        <Paper elevation={1}>
                            <Typography
                                align="right"
                                color="textSecondary"
                                style={{ padding: '1rem 1rem 0 0' }}
                            >
                                {moment(data.queryArticle.createdAt).format(
                                    'MMMM Do YYYY, h:mm:ss a'
                                )}
                            </Typography>
                            <div
                                style={{
                                    padding: '2rem'
                                }}
                                ref={element =>
                                    element && Prism.highlightAllUnder(element)
                                }
                                className="markdown-body"
                                dangerouslySetInnerHTML={{
                                    __html: data.queryArticle.body
                                }}
                            />
                            <div
                                style={{
                                    textAlign: 'right',
                                    padding: '0 1rem 1rem 0'
                                }}
                            >
                                <Button
                                    style={{
                                        marginRight:'1rem'
                                    }}
                                    mini
                                    onClick={() => this.props.history.push(`/articles/editor/${slug}`)}
                                    variant="fab"
                                    aria-label="Edit"
                                    color="primary"
                                >
                                    <EditIcon />
                                </Button>
                                <DeleteArticleButton
                                    slug={slug}
                                    onDeleted={this.onDeletedSuccess}
                                />
                            </div>
                        </Paper>
                    );
                }}
            </Query>
        );
    }
}

export default withRouter(ArticleDetail);
