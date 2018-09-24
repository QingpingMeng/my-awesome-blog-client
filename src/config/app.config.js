export const serverEndpoint =
    process.env.NODE_ENV === 'production'
        ? `http://api.qingping.me`
        : 'http://localhost:3000';

export const graphQLEndpoint = `${serverEndpoint}/graphql`;

export const authSignInEdnpoint = `${serverEndpoint}/signin;`;

export const githubClientId = window.GITHUB_CLIENT_ID || '5a23c310903a1d2675cc';
