import React, { Component } from 'react';
import gql from 'graphql-tag';
import 'github-markdown-css';
import { Query } from 'react-apollo';
import { Paper } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withRouter } from 'react-router';
import Prism from 'prismjs';
import './articleDetail.css';

const ARTICLE_QUERY = gql`
    query GetArticle($condition: String!) {
        queryArticle(condition: $condition) {
            body
            title
        }
    }
`;

class ArticleDetail extends Component {
    render() {
        return (
            <Query
                query={ARTICLE_QUERY}
                variables={{
                    condition: JSON.stringify({
                        slug: this.props.match.params.slug
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
                    return (
                        <Paper elevation={1}>
                            <div
                                style={{
                                    padding:'2rem'
                                }}
                                ref={element => (element && Prism.highlightAllUnder(element))}
                                className="markdown-body"
                                dangerouslySetInnerHTML={{
                                    __html: data.queryArticle.body
                                }}
                            />
                        </Paper>
                    );
                }}
            </Query>
        );
    }
}

export default withRouter(ArticleDetail);
