import { Paper, Button } from '@material-ui/core';
import { Value } from 'slate';
import React from 'react';
import { slateHTMLSerialize } from '../../lib/htmlSerialize';
import { Mutation, withApollo } from 'react-apollo';
import { withRouter } from 'react-router';

import * as styles from './articleEditor.module.css';
// import RichTextEditor from '../../components/Editor/editor';
import StatefulButton from '../../components/Button/statefulButton';
import { ArticleInput } from '../../models/articles.model';
import gql from 'graphql-tag';
import REFRESH_ARTICLE_LIST from '../../lib/queries/refreshList';
import { ARTICLE_DETAIL_QUERY } from './articleDetail';

const CREAT_ARTICLE = gql`
    mutation Create_Article($article: ArticleInput!) {
        createArticle(article: $article) {
            id
            slug
        }
    }
`;

const UPDATE_ARTICLE = gql`
    mutation Update_Article($article: ArticleInput!) {
        updateArticle(article: $article) {
            id
            slug
        }
    }
`;

const QUERY_ARTICLE_FOR_EDIT = gql`
    query GetArticle($condition: String!) {
        queryArticle(condition: $condition) {
            jsonBody
        }
    }
`;

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'title',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: ''
                            }
                        ]
                    }
                ]
            }
        ]
    }
});

class ArticleEditor extends React.Component {
    slug = undefined;

    constructor(props) {
        super(props);

        this.state = {
            value: initialValue
        };

        this.slug = this.props.match.params.slug;
    }

    async componentDidMount() {
        if (this.slug) {
            const { data } = await this.props.client.query({
                query: QUERY_ARTICLE_FOR_EDIT,
                variables: {
                    condition: JSON.stringify({
                        slug: this.slug
                    })
                }
            });

            this.setState({
                value: Value.fromJSON(JSON.parse(data.queryArticle.jsonBody))
            });
        }
    }

    onChange = ({ value }) => {
        this.setState({ value });
    };

    onSubmit = createOrUpdateArticle => {
        const titleNode = this.state.value.document.getBlocks().get(0);
        const summaryNode = this.state.value.document.getBlocks().get(1);
        const newValue = this.state.value
            .change()
            .setNodeByKey(titleNode.key, { type: 'title' })
            .setNodeByKey(summaryNode.key, { type: 'summary' }).value;

        const articleInput = new ArticleInput();
        articleInput.body = slateHTMLSerialize(newValue);
        articleInput.jsonBody = JSON.stringify(newValue.toJSON());
        articleInput.title = titleNode ? titleNode.text : 'Untitled';
        articleInput.summary = summaryNode
            ? summaryNode.text
            : "This article doesn't have any summary.";
        if (this.slug) {
            articleInput.slug = this.slug;
        }
        createOrUpdateArticle({ variables: { article: articleInput } });
    };

    onSubmitedSuccess = ({ createArticle }) => {
        const slug = this.slug ? this.slug : createArticle.slug;
        this.props.history.replace(`/articles/${slug}`);
    };

    refreshQueries = () => {
        let queriesToRefetch = [REFRESH_ARTICLE_LIST];

        if (this.slug) {
            // need to refresh in update scenario
            queriesToRefetch = [
                ...queriesToRefetch,
                {
                    query: ARTICLE_DETAIL_QUERY,
                    variables: {
                        condition: JSON.stringify({
                            slug: this.slug
                        })
                    }
                },
                {
                    query: QUERY_ARTICLE_FOR_EDIT,
                    variables: {
                        condition: JSON.stringify({
                            slug: this.slug
                        })
                    }
                }
            ];
        }

        return queriesToRefetch;
    };

    renderNode = props => {
        if (this.isTitleBlock(props.node)) {
            return (
                <h1 className="title" {...props.attributes}>
                    {props.children}
                </h1>
            );
        }

        if (this.isSummaryBlock(props.node)) {
            // props.node.type = 'summary'; change.setBlocks('code')
            return (
                <p
                    className="summary"
                    style={{
                        opacity: '0.8',
                        fontSize: '1.1rem'
                    }}
                    {...props.attributes}
                >
                    {props.children}
                </p>
            );
        }
    };

    isTitleBlock = node => {
        if (node.object !== 'block') return false;
        if (node === this.state.value.document.getBlocks().get(0)) return true;
    };

    isSummaryBlock = node => {
        if (node.object !== 'block') return false;
        if (node === this.state.value.document.getBlocks().get(1)) return true;
    };

    render() {
        return (
            <div>
                <div className={styles.leftSpace} />
                <Paper className={styles.paper} elevation={1}>
                    <div className={styles.editor}>
                        {/* <RichTextEditor
                            value={this.state.value}
                            renderNode={this.renderNode}
                            onChange={this.onChange}
                        /> */}
                    </div>

                    <Mutation
                        mutation={this.slug ? UPDATE_ARTICLE : CREAT_ARTICLE}
                        onCompleted={this.onSubmitedSuccess}
                        awaitRefetchQueries={true}
                        refetchQueries={this.refreshQueries}
                    >
                        {(createOrUpdateArticle, { data, loading }) => (
                            <div className={styles.buttons}>
                                <div />

                                <StatefulButton
                                    variant="contained"
                                    loading={loading}
                                    loadingSize={20}
                                    onClick={e =>
                                        this.onSubmit(createOrUpdateArticle)
                                    }
                                    color="primary"
                                >
                                    Publish
                                </StatefulButton>
                                <Button
                                    variant="contained"
                                    onClick={this.onSubmit}
                                    color="secondary"
                                >
                                    Save
                                </Button>
                            </div>
                        )}
                    </Mutation>
                </Paper>
                <div className={styles.rightSpace} />
            </div>
        );
    }
}

export default withApollo(withRouter(ArticleEditor));
