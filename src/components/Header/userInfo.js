import React from 'react';
import gql from 'graphql-tag';
// import Avatar from '@material-ui/core/Avatar';
// import GithubSignin from '../SigninLink/githubSignin';
import { Query } from 'react-apollo';
import { Button } from '@material-ui/core';
import blog_config from '../../config/blog.config';

export const CURRENT_USER_EMAIL = gql`
    query {
        authStore @client {
            currentUser {
                isLoggedIn
                email
            }
        }
    }
`;

class UserInfo extends React.Component {
    render() {
        return (
            <Query query={CURRENT_USER_EMAIL} fetchPolicy={'cache-and-network'}>
                {({ error, data }) => {
                    if (error) {
                        return null;
                    }

                    const { currentUser } = data.authStore;

                    if (!currentUser.isLoggedIn) {
                        return null;
                    }

                    if (currentUser.email !== blog_config.ownerEmail) {
                        return null;
                    }

                    return (
                        <Button
                            onClick={() => {
                                this.props.history.push('/articles/editor');
                            }}
                        >
                            New Post{' '}
                        </Button>
                    );
                }}
            </Query>
        );
    }
}

export default UserInfo;
