import * as React from 'react';
import Header from './components/Header/header';
import { CssBaseline, CircularProgress } from '@material-ui/core';
import { Switch, Route } from 'react-router';
import Loadable from 'react-loadable';

import * as styles from './App.module.css';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Redirect from 'react-router/Redirect';

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
})

const AsyncArticleDetail = Loadable({
    loader: () => import('./pages/articles/articleDetail'),
    loading: CircularProgress
})

const AsyncArticleList = Loadable({
    loader: () => import('./pages/articles/articlesList'),
    loading: CircularProgress
})

const AsyncLogin = Loadable({
    loader: () => import('./pages/auth/login'),
    loading: CircularProgress
})

const AsyncAbout = Loadable({
    loader: () => import('./pages/about'),
    loading: CircularProgress
})

const AsyncAuthCallback = Loadable({
    loader: () => import('./pages/auth/callback'),
    loading: CircularProgress
})

const AsyncPrivateRoute = Loadable({
    loader: () => import('./components/Route/privateRoute'),
    loading: CircularProgress
})

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isLoggedIn: false
        };
    }

    componentDidMount() {
        this.props.client.query({ query: CURRENT_USER }).then(({ data }) => {
            this.setState({isLoggedIn: true});
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
                <CssBaseline />
                <div className={styles.root}>
                    <div className={styles.header}>
                        <Header />
                    </div>

                    <div className={styles.mainview}>
                        <div />
                        <Switch>
                            <Route exact path="/" component={AsyncArticleList} />
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
                             <Route
                                exact
                                path="/about"
                                component={AsyncAbout}
                            />
                            <Redirect to="/" />
                        </Switch>
                        <div />
                    </div>
                </div>
            </div>
        );
    }
}

export default withApollo(App);
