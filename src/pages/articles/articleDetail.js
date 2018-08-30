import React, { Component } from 'react';

import 'github-markdown-css';

export default class ArticleDetail extends Component {
    render() {
        const html = window.localStorage.getItem('content') || '<p>Nothing</p>';
        return (
            <div
                style={{
                    maxWidth: '74rem',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}
                className="markdown-body"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        );
    }
}
