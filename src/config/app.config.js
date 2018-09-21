export const serverEndpoint =
    process.env.CI ? 'http://blog-server/' : 'http://localhost:4000';

export const graphQLEndpoint = `${serverEndpoint}/graphql`;

export const authSignInEdnpoint = `${serverEndpoint}/signin;`;

export const githubClientId =
    process.env.githubClientId || '5a23c310903a1d2675cc';
