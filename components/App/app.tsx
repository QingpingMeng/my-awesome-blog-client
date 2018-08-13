import * as React from 'react';
import Header from '../Header/header';
import { CssBaseline } from '@material-ui/core';

import * as styles from './app.scss';
import withApolloClient from '../../lib/with-apollo-client';
export interface IAppProps {}

class App extends React.Component<IAppProps, any> {
    public render() {
        return (
           <div>
                <CssBaseline />
                <div className={styles.root}>
                    <div className={styles.header}>
                        <Header />
                    </div>

                    <div className={styles.mainview}>{this.props.children}</div>
                </div>
           </div>
        );
    }
}

export default  withApolloClient(App);
