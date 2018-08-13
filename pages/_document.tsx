// ./pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document';
import * as React from 'react';
export default class MyDocument extends Document {
    render() {
        return (
            <html>
                <Head>
                    <meta
                        httpEquiv="X-UA-Compatible"
                        content="IE=edge,chrome=1"
                    />
                    <meta
                        httpEquiv="content-type"
                        content="text/html;charset=utf-8"
                    />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no ,viewport-fit=cover"
                    />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="x5-fullscreen" content="true" />
                    <meta name="full-screen" content="yes" />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
                    />

                    <link
                        rel="stylesheet"
                        href="https://unpkg.com/nprogress@0.2.0/nprogress.css"
                    />
                </Head>
                <link rel="stylesheet" href="/_next/static/style.css" />
                <body>
                
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
