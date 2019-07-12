import { LIST_ARTICLES, PAGE_LIMIT } from '../../pages/articles/homepage';
import {  } from '../../pages/articles/drafts';

export const Reload_Articles = {
    query: LIST_ARTICLES,
    variables: { offset: 0, limit: PAGE_LIMIT, condition: JSON.stringify({isDraft: {$ne: true}}) }
};

export const Reload_Drafts = {
    query: LIST_ARTICLES,
    variables: { offset: 0, limit: PAGE_LIMIT, condition: JSON.stringify({isDraft: true}) }
}