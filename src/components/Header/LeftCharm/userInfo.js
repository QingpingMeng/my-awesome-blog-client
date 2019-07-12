import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Button } from '@material-ui/core';
import blog_config from '../../../config/blog.config';
import withRouter from 'react-router/withRouter';

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
                        <>
                            <Button
                                color="secondary"
                                size="medium"
                                onClick={() => {
                                    this.props.history.push('/articles/editor');
                                }}
                            >
                                New Post
                            </Button>
                            <Button
                                color="secondary"
                                size="medium"
                                onClick={() => {
                                    this.props.history.push('/drafts');
                                }}
                            >
                                Drafts
                            </Button>
                        </>
                    );
                }}
            </Query>
        );
    }
}

export default withRouter(UserInfo);
