import React, { Component } from 'react'
import 'github-markdown-css'
import { Paper, Typography } from '@material-ui/core'
import moment from 'moment'
import './articleDetail.css'
// import DeleteArticleButton from '../../components/Articles/deleteArticleButton';
import { syntaxHighlight } from '../../lib/syntaxHighlighter'
import Layout from '../Layout/layout'

class ArticleDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            syntaxHighlighted: false,
        }
    }

    syntaxHighlight = root => {
        if (this.state.syntaxHighlighted || !root) {
            return
        }
        syntaxHighlight(root)
        this.setState({
            syntaxHighlighted: true,
        })
    }

    render() {
        const article = this.props.pageContext.article;
        console.log(article);
        return (
            <Layout>
                <Paper elevation={1}>
                    <Typography
                        align="right"
                        color="textSecondary"
                        style={{ padding: '1rem 1rem 0 0' }}
                    >
                        {moment(article.createdAt).format(
                            'MMMM Do YYYY, h:mm:ss a'
                        )}
                    </Typography>
                    <div
                        style={{
                            padding: '2rem',
                        }}
                        ref={element => {
                            this.syntaxHighlight(element)
                        }}
                        className="markdown-body"
                        dangerouslySetInnerHTML={{
                            __html: article.body,
                        }}
                    />
                </Paper>
            </Layout>
        )
    }
}

export default ArticleDetail
