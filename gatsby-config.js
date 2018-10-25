const createHttpLink = require('apollo-link-http').createHttpLink;
const fetch = require('isomorphic-fetch');

module.exports = {
    siteMetadata: {
        title: 'Gatsby Default Starter',
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: 'gatsby-source-graphql',
            options: {
                typeName: 'Server',
                fieldName: 'server',
                // Create Apollo Link manually. Can return a Promise.
                createLink: pluginOptions => {
                    return createHttpLink({
                      uri: 'https://api.qingping.me/graphql',
                      headers: {
                        'Authorization': `bearer ${process.env.GITHUB_TOKEN}`,
                      },
                      fetch,
                    })
                },
            },
        },
        'gatsby-transformer-sharp',
        'gatsby-plugin-sharp',
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: 'gatsby-starter-default',
                short_name: 'starter',
                start_url: '/',
                background_color: '#663399',
                theme_color: '#663399',
                display: 'minimal-ui',
                icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
            },
        },
        'gatsby-plugin-offline',
    ],
}
