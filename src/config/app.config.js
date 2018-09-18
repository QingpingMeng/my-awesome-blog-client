export default {
    graphQLEndpoint: process.env.graphQLEndpoint || "http://localhost:3000/graphql",
    authSignInEdnpoint: process.env.authSignInEndpoint || "http://localhost:3000/signin",
    githubClientId: process.env.githubClientId || '5a23c310903a1d2675cc',
}