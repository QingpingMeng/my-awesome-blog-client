import * as React from 'react';
import Header from './components/Header/header';
import { CssBaseline, CircularProgress } from '@material-ui/core';
import { Switch, Route } from 'react-router';
import styled from 'styled-components';
import Loadable from 'react-loadable';
import { Helmet } from 'react-helmet';

import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Redirect from 'react-router/Redirect';
import { withErrorBoundary } from './components/withErrorBoundary';

import * as Sentry from '@sentry/browser';

Sentry.init({
    dsn: 'https://5f9d3f665ab3421696ab5c5c63945c21@sentry.io/1308609'
});

const CURRENT_USER = gql`
    {
        currentUser {
            id
            email
        }
    }
`;

const SET_LOCAL_USER = gql`
    mutation SetLocalUser($user: CurrentUser) {
        setCurrentUser(user: $user) @client
    }
`;

const AsyncArticleEditor = Loadable({
    loader: () => import('./pages/articles/articleEditor'),
    loading: CircularProgress
});

const AsyncArticleDetail = Loadable({
    loader: () => import('./pages/articles/articleDetail'),
    loading: CircularProgress
});

const AsyncArticleList = Loadable({
    loader: () => import('./pages/articles/articlesList'),
    loading: CircularProgress
});

const AsyncLogin = Loadable({
    loader: () => import('./pages/auth/login'),
    loading: CircularProgress
});

const AsyncAbout = Loadable({
    loader: () => import('./pages/about'),
    loading: CircularProgress
});

const AsyncAuthCallback = Loadable({
    loader: () => import('./pages/auth/callback'),
    loading: CircularProgress
});

const AsyncPrivateRoute = Loadable({
    loader: () => import('./components/Route/privateRoute'),
    loading: CircularProgress
});

const Root = styled.div`
    display: grid;
    grid-template-rows: 64px 1fr;
    grid-template-columns: 1fr;
    grid-template-areas:
        'header'
        'mainview';
`;

const HeaderContainer = styled.div`
    grid-area: header;
`;

const MainView = styled.div`
    grid-area: mainview;
    grid-template-columns: 1fr minmax(200px, 60rem) 1fr;
    padding: 1rem;
    padding: 1rem;
    display: grid;
`;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false
        };
    }

    componentDidMount() {
        this.props.client
            .query({ query: CURRENT_USER })
            .then(({ data }) => {
                this.setState({ isLoggedIn: true });
                return this.props.client.mutate({
                    mutation: SET_LOCAL_USER,
                    variables: {
                        user: { ...data.currentUser, isLoggedIn: true }
                    }
                });
            })
            .catch(error => {});
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Qingping Meng </title>
                    <meta http-equiv="x-ua-compatible" content="ie=edge" />
                    <meta name="robots" content="index, follow" />
                    <meta charset="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, shrink-to-fit=no"
                    />
                    <meta name="theme-color" content="#000000" />
                </Helmet>
                <CssBaseline />
                <Root>
                    <HeaderContainer>
                        <Header />
                    </HeaderContainer>

                    <MainView>
                        <div />
                        <Switch>
                            <Route
                                exact
                                path="/"
                                component={AsyncArticleList}
                            />
                            <Route path="/login" component={AsyncLogin} />
                            <AsyncPrivateRoute
                                isLoggedIn={this.state.isLoggedIn}
                                exact
                                path="/articles/editor/"
                                component={AsyncArticleEditor}
                            />
                            <AsyncPrivateRoute
                                isLoggedIn={this.state.isLoggedIn}
                                path="/articles/editor/:slug"
                                component={AsyncArticleEditor}
                            />
                            <Route
                                path="/articles/:slug"
                                component={AsyncArticleDetail}
                            />
                            <Route
                                exact
                                path="/auth/callback"
                                component={AsyncAuthCallback}
                            />
                            <Route exact path="/about" component={AsyncAbout} />
                            <Redirect to="/" />
                        </Switch>
                        <div />
                    </MainView>
                </Root>
            </div>
        );
    }
}

export default withErrorBoundary(withApollo(App));
