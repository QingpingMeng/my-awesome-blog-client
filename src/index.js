import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import registerServiceWorker from './registerServiceWorker';
import initApollo from './lib/init-apollo';

const app = (
    <ApolloProvider client={initApollo()}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ApolloProvider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
