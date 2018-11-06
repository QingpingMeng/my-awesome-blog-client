import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ArticlePreview from '../../components/Articles/articlePreview';
import { LinearProgress } from '@material-ui/core';
import * as styles from './articlesList.module.css';
import { withRouter } from 'react-router';
import StatefullButton from '../../components/Button/statefulButton';
import { Helmet } from 'react-helmet';

export const PAGE_LIMIT = 10;

export const LIST_ARTICLES = gql`
    query ListArticles($limit: Int, $offset: Int) {
        queryArticles(limit: $limit, offset: $offset) {
            slug
            title
            summary
            createdAt
        }
    }
`;

class ArticlesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasReachedToBottom: false
        };
    }

    readMore = slug => {
        this.props.history.push(`/articles/${slug}`);
    };

    render() {
        return (
            <div className={styles.listContainer}>
                <Helmet>
                    <title>Qingping Meng - All articles</title>
                </Helmet>
                <Query
                    query={LIST_ARTICLES}
                    notifyOnNetworkStatusChange={true}
                    variables={{ offset: 0, limit: PAGE_LIMIT }}
                >
                    {({ loading, data, error, fetchMore, networkStatus }) => {
                        const loadingMore = networkStatus === 3;
                        if (loading && !loadingMore) {
                            return <LinearProgress />;
                        }

                        if (error) {
                            return null;
                        }

                        const helmet = (
                            <Helmet>
                                <meta
                                    name="description"
                                    content="How I built this blog"
                                />
                            </Helmet>
                        );

                        const previews = data.queryArticles.map(article => (
                            <ArticlePreview
                                onReadMore={() => this.readMore(article.slug)}
                                key={article.slug}
                                {...article}
                            />
                        ));

                        const loadMoreButton = (
                            <StatefullButton
                                disabled={this.state.hasReachedToBottom}
                                loading={loadingMore} // loading more
                                onClick={() =>
                                    fetchMore({
                                        variables: {
                                            offset: data.queryArticles.length
                                        },
                                        updateQuery: (
                                            prev,
                                            { fetchMoreResult }
                                        ) => {
                                            if (
                                                !fetchMoreResult ||
                                                !fetchMoreResult.queryArticles ||
                                                fetchMoreResult.queryArticles
                                                    .length === 0
                                            ) {
                                                this.setState({
                                                    hasReachedToBottom: true
                                                });
                                                return prev;
                                            }
                                            return Object.assign({}, prev, {
                                                queryArticles: [
                                                    ...prev.queryArticles,
                                                    ...fetchMoreResult.queryArticles
                                                ]
                                            });
                                        }
                                    })
                                }
                                key="loadMore"
                                variant="raised"
                                color="primary"
                            >
                                {this.state.hasReachedToBottom
                                    ? 'No more results'
                                    : 'Load more...'}
                            </StatefullButton>
                        );

                        return [helmet, ...previews, loadMoreButton];
                    }}
                </Query>
            </div>
        );
    }
}

export default withRouter(ArticlesList);
