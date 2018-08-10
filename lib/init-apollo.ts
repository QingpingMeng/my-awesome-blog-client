import { ApolloClient, ApolloLink } from 'apollo-boost';
import { HttpLink } from 'apollo-boost';
import { InMemoryCache } from 'apollo-boost';
import fetch from 'isomorphic-fetch';
import { withClientState } from 'apollo-link-state';
import { authStore } from '../localStore/authStore';
import { merge } from 'lodash';

let apolloClient = null;

const authMiddleware = new ApolloLink((operation, forward) => {
    if(localStorage.getItem('jwt')){
        operation.setContext(({ headers = {} }) => ({
            headers: {
              ...headers,
              authorization: `Bearer ${localStorage.getItem('jwt') || ''}`,
            } 
          }));
    }
   
    return forward(operation);
  })
  

function create(initialState?) {
    const cache = new InMemoryCache().restore(initialState || {});
    const localLink = withClientState({
        ...merge(authStore),
        cache
    });
    const httpLink = new HttpLink({
        uri: 'http://localhost:3000/graphql', // Server URL (must be absolute)
        fetch
    });

    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    return new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once),
        link: ApolloLink.from([authMiddleware, localLink, httpLink]),
        cache: cache
    });
}

export default function initApollo(initialState?) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (!process.browser) {
        return create(initialState);
    }

    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = create(initialState);
    }

    return apolloClient;
}
