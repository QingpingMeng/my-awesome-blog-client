const path = require('path');

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
    return new Promise((resolve, reject) => {
      graphql(`
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
      `).then(result => {
        result.data.server.queryArticles.forEach(article => {
          createPage({
            path: article.slug,
            component: path.resolve(`./src/components/Articles/articleDetail.js`),
            context: {
              // Data passed to context is available
              // in page queries as GraphQL variables.
              article: article,
            },
          })
        })
        resolve()
      })
    })
  }