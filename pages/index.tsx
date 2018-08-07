import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';
import fetch from 'isomorphic-fetch';

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    fetch
});

const PROFILE_QUERY = gql`
    query RootQuery {
        queryArticles{
            slug
        }
    }
`;

const App = () => (
    <ApolloProvider
        client={client}
        children={
            <Query
                query={PROFILE_QUERY}
                fetchPolicy={'cache-and-network'}
                children={({ loading, error, data: { currentUser } }) => {
                    if (loading) return <span>loading....</span>;
                    if (error) return <span>error...</span>;
                    return <h1>Welcome back {currentUser.firstName}</h1>;
                }}
            />
        }
    />
);

export default () => <App />;
