import { LIST_ARTICLES, PAGE_LIMIT } from '../../pages/articles/articlesList';

export default {
    query: LIST_ARTICLES,
    variables: { offset: 0, limit: PAGE_LIMIT }
};
