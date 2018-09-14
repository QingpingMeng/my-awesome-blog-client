import * as React from 'react';
import Header from './components/Header/header';
import { CssBaseline } from '@material-ui/core';
import { Switch, Route } from 'react-router';
import AuthCallback from './pages/auth/callback';

import * as styles from './App.module.css';
import ArticleEditor from './pages/articles/articleEditor';
import ArticleDetail from './pages/articles/articleDetail';
import ArticlesList from './pages/articles/articlesList';
import Login from './pages/auth/login';
import { withApollo } from 'react-apollo';
import About from './pages/about'
import gql from 'graphql-tag';

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

class App extends React.Component {
    componentDidMount() {
        this.props.client.query({ query: CURRENT_USER }).then(({ data }) => {
            return this.props.client.mutate({
                mutation: SET_LOCAL_USER,
                variables: {
                    user: { ...data.currentUser, isLoggedIn: true }
                }
            });
        });
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
                            <Route exact path="/" component={ArticlesList} />
                            <Route path="/login" component={Login} />
                            <Route
                                exact
                                path="/articles/editor/"
                                component={ArticleEditor}
                            />
                            <Route
                                path="/articles/editor/:slug"
                                component={ArticleEditor}
                            />
                            <Route
                                path="/articles/:slug"
                                component={ArticleDetail}
                            />
                            <Route
                                exact
                                path="/auth/callback"
                                component={AuthCallback}
                            />
                             <Route
                                exact
                                path="/about"
                                component={About}
                            />
                        </Switch>
                        <div />
                    </div>
                </div>
            </div>
        );
    }
}

export default withApollo(App);
