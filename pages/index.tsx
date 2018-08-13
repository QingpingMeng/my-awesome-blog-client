import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import withApolloClient from '../lib/with-apollo-client';
import App from '../components/App/app';
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
console.log('Indx');
const Component = () => (
    <App>
        <Query query={PROFILE_QUERY} fetchPolicy={'cache-and-network'}>
            {({ loading, error, data }) => {
                if (loading) return <span>loading....</span>;
                if (error) return <span>error...</span>;
                return (
                    <div>
                        <h1>
                            Welcome back{' '}
                            <Link prefetch href="/about">
                                <a>About</a>
                            </Link>
                        </h1>
                        <a
                            href={`https://github.com/login/oauth/authorize?client_id=5a23c310903a1d2675cc&scope=user:mail`}
                        >
                            Sign in
                        </a>
                    </div>
                );
            }}
        </Query>
    </App>
);

export default Component;
