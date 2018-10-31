// Express requirements
import path from 'path';
import fs from 'fs';

// React requirements
import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import { StaticRouter } from 'react-router';
import { Frontload, frontloadServerRender } from 'react-frontload';
import Loadable from 'react-loadable';
import { SheetsRegistry } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';

// Our store, entrypoint, and manifest
import App from '../src/App';
import manifest from '../build/asset-manifest.json';
import {
    MuiThemeProvider,
    createMuiTheme,
    createGenerateClassName
} from '@material-ui/core';
import { ApolloProvider } from 'react-apollo';
import initApollo from '../src/lib/init-apollo';

// Theme
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

// LOADER
export default (req, res) => {
    /*
    A simple helper function to prepare the HTML markup. This loads:
      - Page title
      - SEO meta tags
      - Preloaded state (for Redux) depending on the current route
      - Code-split script tags depending on the current route
      - extra styles required for 3rd party ui library on first load (e.g. Material UI)
  */
    const injectHTML = (data, { html, title, meta, body, scripts, styles }) => {
        data = data.replace('<html>', `<html ${html}>`);
        data = data.replace(/<title>.*?<\/title>/g, title);
        data = data.replace('</head>', `${meta}</head>`);
        data = data.replace(
            '<div id="root"></div>',
            `<div id="root">${body}</div>`
        );
        data = data.replace('</body>', scripts.join('') + '</body>');
        data = data.replace(
            '</body>',
            `<style id="jss-server-side">${styles}</style></body>`
        );
        return data;
    };

    // Create a sheetsRegistry instance.
    const sheetsRegistry = new SheetsRegistry();

    // Create a sheetsManager instance.
    const sheetsManager = new Map();

    // Create a new class name generator.
    const generateClassName = createGenerateClassName();

    // Load in our HTML file from our build
    fs.readFile(
        path.resolve(__dirname, '../build/index.html'),
        'utf8',
        (err, htmlData) => {
            // If there's an error... serve up something nasty
            if (err) {
                console.error('Read error', err);

                return res.status(404).end();
            }

            const context = {};
            const modules = [];

            /*
        Here's the core funtionality of this file. We do the following in specific order (inside-out):
          1. Load the <App /> component
          2. Inside of the Frontload HOC
          3. Inside of a Redux <StaticRouter /> (since we're on the server), given a location and context to write to
          4. Inside of the store provider
          5. Inside of the React Loadable HOC to make sure we have the right scripts depending on page
          6. Render all of this sexiness
          7. Make sure that when rendering Frontload knows to get all the appropriate preloaded requests
        In English, we basically need to know what page we're dealing with, and then load all the appropriate scripts and
        data for that page. We take all that information and compute the appropriate state to send to the user. This is
        then loaded into the correct components and sent as a Promise to be handled below.
      */
            frontloadServerRender(() =>
                renderToString(
                    <Loadable.Capture report={m => modules.push(m)}>
                        <StaticRouter location={req.url} context={context}>
                            <Frontload isServer={true}>
                                <ApolloProvider client={initApollo()}>
                                    <JssProvider
                                        registry={sheetsRegistry}
                                        generateClassName={generateClassName}
                                    >
                                        <MuiThemeProvider
                                            theme={theme}
                                            sheetsManager={sheetsManager}
                                        >
                                            <App />
                                        </MuiThemeProvider>
                                    </JssProvider>
                                </ApolloProvider>
                            </Frontload>
                        </StaticRouter>
                    </Loadable.Capture>
                )
            ).then(routeMarkup => {
                if (context.url) {
                    // If context has a url property, then we need to handle a redirection in Redux Router
                    res.writeHead(302, {
                        Location: context.url
                    });

                    res.end();
                } else {
                    // Otherwise, we carry on...

                    // Let's give ourself a function to load all our page-specific JS assets for code splitting
                    const extractAssets = (assets, chunks) =>
                        Object.keys(assets)
                            .filter(
                                asset =>
                                    chunks.indexOf(asset.replace('.js', '')) >
                                    -1
                            )
                            .map(k => assets[k]);

                    // Let's format those assets into pretty <script> tags
                    const extraChunks = extractAssets(manifest, modules).map(
                        c =>
                            `<script type="text/javascript" src="/${c.replace(
                                /^\//,
                                ''
                            )}"></script>`
                    );

                    // We need to tell Helmet to compute the right meta tags, title, and such
                    const helmet = Helmet.renderStatic();

                    // NOTE: Disable if you desire
                    // Let's output the title, just to see SSR is working as intended
                    console.log('THE TITLE', helmet.title.toString());

                    // Grab the CSS from our sheetsRegistry.
                    const materialUIStyles = sheetsRegistry.toString();
                    // Pass all this nonsense into our HTML formatting function above
                    const html = injectHTML(htmlData, {
                        html: helmet.htmlAttributes.toString(),
                        title: helmet.title.toString(),
                        meta: helmet.meta.toString(),
                        body: routeMarkup,
                        scripts: extraChunks,
                        styles: materialUIStyles
                    });

                    // We have all the final HTML, let's send it to the user already!
                    res.send(html);
                }
            });
        }
    );
};
