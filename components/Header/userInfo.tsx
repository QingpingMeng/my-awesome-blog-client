import * as React from 'react';
import gql from 'graphql-tag';
import Avatar from '@material-ui/core/Avatar';
import GithubSignin from '../SigninLink/github';
import { Query } from 'react-apollo';
import withApolloClient from '../../lib/with-apollo-client';

const query = gql`
    query {
        currentUser {
            username
            avatar
        }
    }
`;

export interface IAppProps {
}

class UserInfo extends React.Component<IAppProps, any> {
  public render() {
    return (
        <Query query={query} fetchPolicy={'cache-and-network'}>
            {({ loading, error, data }) => {
                if (error) {
                    return <GithubSignin size="24px" />;
                }

                if (data.currentUser) {
                    return (
                        <Avatar
                            alt={data.currentUser.username}
                            src={data.currentUser.avatar}
                        />
                    );
                }

                return null;
            }}
        </Query>
    );
  }
}

export default withApolloClient(UserInfo);
