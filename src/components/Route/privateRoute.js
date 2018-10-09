import React from 'react';
import { Route } from 'react-router';
import Redirect from 'react-router/Redirect';

export default ({ component: Component, isLoggedIn, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (isLoggedIn) {
                    return <Component {...props} />;
                } else {
                    return <Redirect to="/home" />;
                }
            }}
        />
    );
};
