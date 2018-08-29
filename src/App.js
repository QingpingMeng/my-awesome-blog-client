
import * as React from 'react';
import Header from './components/Header/header';
import { CssBaseline } from '@material-ui/core';

import * as styles from './App.module.css';

console.log(styles);

class App extends React.Component{
    render() {
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

export default App;