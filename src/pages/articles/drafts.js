import React from 'react';
import ArticlesList from '../../components/Articles/articleList';
import { LIST_ARTICLES } from './homepage';

export const PAGE_LIMIT = 10;

const condition = { isDraft: true };

const HomePage = () => {
    return (
        <ArticlesList
            condition={condition}
            query={LIST_ARTICLES}
            pageLimit={PAGE_LIMIT}
        />
    );
};

export default HomePage;
