import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ArticlePreview from '../../components/Articles/articlePreview';
import { LinearProgress } from '@material-ui/core';
import * as styles from './articlesList.module.css';
import { withRouter } from 'react-router';

const LIST_ARTICLES = gql`
    {
        queryArticles {
            slug
            title
            previewBody
            createdAt
        }
    }
`;

class ArticlesList extends Component {
    readMore = slug => {
        this.props.history.push(`/articles/${slug}`);
    };

    render() {
        return (
            <div className={styles.listContainer}>
                <Query query={LIST_ARTICLES}>
                    {({ loading, data }) => {
                        if (loading) {
                            return <LinearProgress />;
                        }
                        return data.queryArticles.map(article => (
                            <ArticlePreview
                                onClick={() => this.readMore(article.slug)}
                                key={article.slug}
                                {...article}
                            />
                        ));
                    }}
                </Query>
            </div>
        );
    }
}

export default withRouter(ArticlesList);
