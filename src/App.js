import * as React from 'react';
import Header from './components/Header/header';
import { CssBaseline } from '@material-ui/core';
import { Switch, Route } from 'react-router';
import AuthCallback from './pages/auth/callback';

import * as styles from './App.module.css';
import NewArticle from './pages/articles/new';

console.log(styles);

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
                        <Switch>
                            <Route exact path="/" component={NewArticle} />
                            <Route
                                path="/articles/new"
                                component={NewArticle}
                            />
                            <Route
                                exact
                                path="/auth/callback"
                                component={AuthCallback}
                            />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
