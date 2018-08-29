import React from 'react';
import gql from 'graphql-tag';
import Avatar from '@material-ui/core/Avatar';
import GithubSignin from '../SigninLink/githubSignin';
import { Query } from 'react-apollo';

const query = gql`
    query {
        currentUser {
            username
            avatar
        }
    }
`;

class UserInfo extends React.Component {
    render() {
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

export default UserInfo;
