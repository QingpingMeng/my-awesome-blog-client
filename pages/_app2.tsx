import App, { Container } from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import withApollo from '../lib/with-apollo-client';

class MyApp extends App<{apolloClient: any}> {
    render() {
        const { Component, pageProps, apolloClient} = this.props;
        console.log(apolloClient);
        return (
            <Container>
                <ApolloProvider client={apolloClient}>
                    <Component {...pageProps} />
                </ApolloProvider>
            </Container>
        );
    }
}

export default withApollo(MyApp);
