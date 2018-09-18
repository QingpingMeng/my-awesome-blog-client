import { ApolloClient, ApolloLink } from 'apollo-boost';
import { HttpLink } from 'apollo-boost';
import { InMemoryCache } from 'apollo-boost';
import fetch from 'isomorphic-fetch';
import { withClientState } from 'apollo-link-state';
import { authStore } from '../stores/authStore';
import { merge } from 'lodash';
import {graphQLEndpoint} from '../config/app.config';

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
  

function create(initialState) {
    const cache = new InMemoryCache().restore(initialState || {});
    const localLink = withClientState({
        ...merge(authStore),
        cache
    });
    const httpLink = new HttpLink({
        uri: graphQLEndpoint, // Server URL (must be absolute)
        fetch
    });

    return new ApolloClient({
        link: ApolloLink.from([authMiddleware, localLink, httpLink]),
        cache: cache
    });
}

export default function initApollo(initialState) {
    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = create(initialState);
    }

    return apolloClient;
}