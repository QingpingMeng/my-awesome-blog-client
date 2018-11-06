import React from 'react';
import 'github-markdown-css';
import { Helmet } from 'react-helmet';

export default () => {
    return (
        <div style={{ textAlign: 'center' }} className="markdown-body">
            <Helmet>
                <title>About</title>
                <meta name="description" content="Hello, my name is Qingping Meng." />
            </Helmet>
            <hr />
            <p>
                Hello, my name is Qingping Meng. I am a software engineer at
                Microsoft now.
            </p>
            <p>
                I will share some take-aways learned from my web development
                journey.
            </p>
            <p>
                Feel free to leave your feedback or report issues at my GitHub
                repo.
            </p>
            <hr />
        </div>
    );
};
