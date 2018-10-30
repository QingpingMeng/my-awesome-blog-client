import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import registerServiceWorker from './registerServiceWorker';
import initApollo from './lib/init-apollo';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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

export const app = (
    <ApolloProvider client={initApollo()}>
        <BrowserRouter>
            <MuiThemeProvider theme={theme}>
                <App />
            </MuiThemeProvider>
        </BrowserRouter>
    </ApolloProvider>
);

ReactDOM.render(app, document.getElementById('root'));

// if(window)
// {
//     registerServiceWorker()
// }
