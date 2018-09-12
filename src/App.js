import * as React from 'react';
import Header from './components/Header/header';
import { CssBaseline } from '@material-ui/core';
import { Switch, Route } from 'react-router';
import AuthCallback from './pages/auth/callback';

import * as styles from './App.module.css';
import ArticleEditor from './pages/articles/articleEditor';
import ArticleDetail from './pages/articles/articleDetail';
import ArticlesList from './pages/articles/articlesList';

class App extends React.Component {
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
                        </Switch>
                        <div />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
