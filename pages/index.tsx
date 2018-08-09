import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import withApolloClient from '../lib/with-apollo-client';
import Link from 'next/link';

const PROFILE_QUERY = gql`
    query {
        authStore @client {
           isLoggedIn
        }
        queryArticles {
            slug
        }
    }
`;

const App = () => (
    <Query query={PROFILE_QUERY} fetchPolicy={'cache-and-network'}>
        {({ loading, error, data }) => {
            if (loading) return <span>loading....</span>;
            if (error) return <span>error...</span>;
            return (
                <h1>
                    Welcome back{' '}
                    <Link prefetch href="/about">
                        <a>About</a>
                    </Link>
                    <a href='http://localhost:3000/auth/github/' target="_blank">Sign in</a>
                </h1>
            );
        }}
    </Query>
);

export default withApolloClient(App);
