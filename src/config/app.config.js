export const serverEndpoint =
    process.env.NODE_ENV === 'production'
        ? `http://api.qingping.me`
        : 'http://localhost:3000';

export const graphQLEndpoint = `${serverEndpoint}/graphql`;

export const authSignInEdnpoint = `${serverEndpoint}/signin`;

export const githubClientId =
    process.env.NODE_ENV === 'production'
        ? '5eae5aac765232888488'
        : '5a23c310903a1d2675cc';
