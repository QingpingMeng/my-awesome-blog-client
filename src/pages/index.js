import Layout from '../components/Layout/layout'
import React from 'react'
import ArticlesList from '../components/Articles/articlesList';

import { graphql } from 'gatsby'

export const query = graphql`
    query {
        server {
            queryArticles {
                slug
                createdAt
                title
                summary
            }
        }
    }
`

const IndexPage = ({data}) => {
  return <Layout>
     <ArticlesList articles={data.server.queryArticles} />
  </Layout>
}

export default IndexPage
