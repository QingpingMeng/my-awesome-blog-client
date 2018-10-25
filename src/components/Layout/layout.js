import React, { Component } from 'react'
import Header from '../Header/header'
import { CssBaseline } from '@material-ui/core'
import * as styles from './layout.module.css'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            `'Work Sans',sans-serif`,
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
})

export default class Layout extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <CssBaseline />
                    <div className={styles.root}>
                        <div className={styles.header}>
                            <Header />
                        </div>

                        <div className={styles.mainview}>
                            <div />
                            {this.props.children}
                            <div />
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}
