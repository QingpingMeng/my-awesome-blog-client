import React from 'react';
import { Route } from 'react-router';
import Redirect from 'react-router/Redirect';
import { Query } from 'react-apollo';
import { CURRENT_USER_EMAIL } from '../Header/LeftCharm/userInfo';
import blog_config from '../../config/blog.config';

export default ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => (
                <Query
                    query={CURRENT_USER_EMAIL}
                    fetchPolicy={'cache-and-network'}
                >
                    {({ error, data }) => {
                        if (error) {
                            return <Redirect to="/home" />;
                        }

                        const { currentUser } = data.authStore;

                        if (!currentUser.isLoggedIn) {
                            return <Redirect to="/home" />;
                        }

                        if (currentUser.email !== blog_config.ownerEmail) {
                            return <Redirect to="/home" />;
                        }

                        return <Component {...props} />;
                    }}
                </Query>
            )}
        />
    );
};
