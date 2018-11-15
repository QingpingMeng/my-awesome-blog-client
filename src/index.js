import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import registerServiceWorker from './registerServiceWorker';
import JssProvider from 'react-jss/lib/JssProvider';
import initApollo from './lib/init-apollo';
import {
    MuiThemeProvider,
    createMuiTheme,
    createGenerateClassName
} from '@material-ui/core/styles';

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
            '"Segoe UI Symbol"'
        ].join(',')
    }
});

// Create a new class name generator.
const generateClassName = createGenerateClassName();

class ClientEntry extends React.Component {
    componentDidMount() {
        const serverStyles = document.getElementById('styles-server-side');
        if (serverStyles && serverStyles.parentNode) {
            serverStyles.parentNode.removeChild(serverStyles);
        }
    }

    render() {
        return <App />
    }
}

export const app = (
    <ApolloProvider client={initApollo()}>
        <BrowserRouter>
            <JssProvider generateClassName={generateClassName}>
                <MuiThemeProvider theme={theme}>
                    <ClientEntry />
                </MuiThemeProvider>
            </JssProvider>
        </BrowserRouter>
    </ApolloProvider>
);

ReactDOM.hydrate(app, document.getElementById('root'));

registerServiceWorker();
