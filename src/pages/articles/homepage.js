import React from 'react';
import gql from 'graphql-tag';
import ArticlesList from '../../components/Articles/articleList';

export const PAGE_LIMIT = 10;

export const LIST_ARTICLES = gql`
    query ListArticles($condition: String, $limit: Int, $offset: Int) {
        queryArticles(condition: $condition, limit: $limit, offset: $offset) {
            slug
            title
            summary
            createdAt
        }
    }
`;

const condition = {isDraft: {$ne: true}};

const HomePage = () => {
    return <ArticlesList query={LIST_ARTICLES} condition={condition} pageLimit={PAGE_LIMIT} />
}

export default HomePage;
