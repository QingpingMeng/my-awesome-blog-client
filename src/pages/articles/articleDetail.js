import React, { Component } from 'react';
import gql from 'graphql-tag';
import 'github-markdown-css';
import { Query } from 'react-apollo';
import { Paper, Typography, Button } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withRouter } from 'react-router';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import './articleDetail.css';
import DeleteArticleButton from '../../components/Articles/deleteArticleButton';
import { syntaxHighlight } from '../../lib/syntaxHighlighter';
import {Helmet} from 'react-helmet';

export const ARTICLE_DETAIL_QUERY = gql`
    query GetArticle($condition: String!) {
        queryArticle(condition: $condition) {
            body
            title
            createdAt
            author {
                email
            }
        }
    }
`;

const CURRENT_USER_ID = gql`
    query CurrentUserId {
        authStore @client {
            currentUser {
                isLoggedIn
                email
            }
        }
    }
`;

class ArticleDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            syntaxHighlighted: false
        };
    }

    onDeletedSuccess = () => {
        this.props.history.replace('/');
    };

    syntaxHighlight = root => {
        if (this.state.syntaxHighlighted || !root) {
            return;
        }
        syntaxHighlight(root);
        this.setState({
            syntaxHighlighted: true
        });
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

                    if (error || !data.queryArticle) {
                        return (
                            <div
                                style={{
                                    padding: '2rem'
                                }}
                                className="markdown-body"
                            >
                                <h1>
                                    Something went wrong. Article could not be
                                    feteched.
                                </h1>
                            </div>
                        );
                    }

                    const { email: authorEmail } = data.queryArticle.author;
                    if (!data.queryArticle) {
                        return (
                            <div
                                style={{
                                    padding: '2rem'
                                }}
                                className="markdown-body"
                            >
                                <h1>Article not found.</h1>
                            </div>
                        );
                    }

                    return (
                        <Paper elevation={1}>
                            <Helmet>
                                <title>{data.queryArticle.title}</title>
                                <meta name="description" content={data.queryArticle.summary} />
                            </Helmet>
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
                                ref={element => {
                                    this.syntaxHighlight(element);
                                }}
                                className="markdown-body"
                                dangerouslySetInnerHTML={{
                                    __html: data.queryArticle.body
                                }}
                            />
                            <Query query={CURRENT_USER_ID}>
                                {({
                                    loading: loadingUser,
                                    data: userData,
                                    error: loadingUserError
                                }) => {
                                    if (
                                        loadingUser ||
                                        loadingUserError ||
                                        !userData.authStore
                                    ) {
                                        return null;
                                    }

                                    const {
                                        isLoggedIn,
                                        email: currentUserEmail
                                    } = userData.authStore.currentUser;

                                    if (
                                        isLoggedIn &&
                                        currentUserEmail === authorEmail
                                    ) {
                                        return (
                                            <div
                                                style={{
                                                    textAlign: 'right',
                                                    padding: '0 1rem 1rem 0'
                                                }}
                                            >
                                                <Button
                                                    style={{
                                                        marginRight: '1rem'
                                                    }}
                                                    mini
                                                    onClick={() =>
                                                        this.props.history.push(
                                                            `/articles/editor/${slug}`
                                                        )
                                                    }
                                                    variant="fab"
                                                    aria-label="Edit"
                                                    color="primary"
                                                >
                                                    <EditIcon />
                                                </Button>
                                                <DeleteArticleButton
                                                    slug={slug}
                                                    onDeleted={
                                                        this.onDeletedSuccess
                                                    }
                                                />
                                            </div>
                                        );
                                    }

                                    return null;
                                }}
                            </Query>
                        </Paper>
                    );
                }}
            </Query>
        );
    }
}

export default withRouter(ArticleDetail);
