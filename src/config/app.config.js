export const serverEndpoint = window.API_HOST ? `http://${window.API_HOST}` : 'http://localhost:4000';

export const graphQLEndpoint = `${serverEndpoint}/graphql`;

export const authSignInEdnpoint = `${serverEndpoint}/signin;`;

export const githubClientId = window.GITHUB_CLIENT_ID || '5a23c310903a1d2675cc';
