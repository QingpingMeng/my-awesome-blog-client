import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import withApolloClient from '../lib/with-apollo-client';

const PROFILE_QUERY = gql`
    query RootQuery {
        queryArticles {
            slug
        }
    }
`;

const App = () => (
    <Query query={PROFILE_QUERY} fetchPolicy={'cache-and-network'}>
        {({ loading, error }) => {
            if (loading) return <span>loading....</span>;
            if (error) return <span>error...</span>;
            return <h1>Welcome back</h1>;
        }}
    </Query>
);

export default withApolloClient(App);
