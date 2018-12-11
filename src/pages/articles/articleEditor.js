import { Paper } from '@material-ui/core';
import { Value } from 'slate';
import React from 'react';
import { slateHTMLSerialize } from '../../lib/htmlSerialize';
import { Mutation, withApollo } from 'react-apollo';
import { withRouter } from 'react-router';
import { withSnackbar } from 'notistack';

import * as styles from './articleEditor.module.css';
import RichTextEditor from '../../components/Editor/editor';
import StatefulButton from '../../components/Button/statefulButton';
import { ArticleInput } from '../../models/articles.model';
import gql from 'graphql-tag';
import { Reload_Articles, Reload_Drafts } from '../../lib/queries/refreshList';
import { ARTICLE_DETAIL_QUERY } from './articleDetail';

const CREATE_ARTICLE = gql`
    mutation Create_Article($article: ArticleInput!) {
        createArticle(article: $article) {
            id
            slug
            isDraft
        }
    }
`;

const UPDATE_ARTICLE = gql`
    mutation Update_Article($article: ArticleInput!) {
        updateArticle(article: $article) {
            id
            slug
            isDraft
            updatedAt
        }
    }
`;

const QUERY_ARTICLE_FOR_EDIT = gql`
    query GetArticle($condition: String!) {
        queryArticle(condition: $condition) {
            jsonBody
            isDraft
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
            value: initialValue,
            editorStateSnapshot: initialValue,
            intervalId: undefined
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

    onAutoSave = async () => {
        if (this.state.editorStateSnapshot !== this.state.value) {
            console.log('AutoSave triggered');
            const articleInput = this.populateArticle();
            const { data } = await this.props.client.mutate({
                mutation: UPDATE_ARTICLE,
                variables: {
                    article: articleInput
                }
            });
            this.props.enqueueSnackbar(
                `Auto saved on ${data.updateArticle.updatedAt}`
            );
            this.setState({
                editorStateSnapshot: this.state.value
            });
        }
        console.log('End of auto save');
    };

    onChange = ({ value }) => {
        this.setState({ value });
    };

    onSave = createOrUpdateArticle => {
        const articleInput = this.populateArticle();
        articleInput.isDraft = true;
        createOrUpdateArticle({ variables: { article: articleInput } });
    };

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    populateArticle = () => {
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

        return articleInput;
    };

    onSubmit = createOrUpdateArticle => {
        const articleInput = this.populateArticle();
        articleInput.isDraft = false;
        createOrUpdateArticle({ variables: { article: articleInput } });
    };

    onSubmitedSuccess = ({ createArticle, updateArticle }) => {
        const result = createArticle || updateArticle;
        const slug = this.slug ? this.slug : result.slug;
        if (result.isDraft) {
            this.slug = slug;
            this.props.enqueueSnackbar('Successfully saved.');
            this.setState({
                editorStateSnapshot: this.state.value
            });
            const intervalId = setInterval(this.onAutoSave, 10000);
            this.setState({
                intervalId
            });
        } else {
            this.props.history.replace(`/articles/${slug}`);
        }
    };

    refreshQueries = () => {
        let queriesToRefetch = [Reload_Articles, Reload_Drafts];

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
                        <RichTextEditor
                            value={this.state.value}
                            renderNode={this.renderNode}
                            onChange={this.onChange}
                        />
                    </div>

                    <Mutation
                        mutation={this.slug ? UPDATE_ARTICLE : CREATE_ARTICLE}
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
                                <StatefulButton
                                    loading={loading}
                                    loadingSize={20}
                                    variant="contained"
                                    onClick={e =>
                                        this.onSave(createOrUpdateArticle)
                                    }
                                    color="secondary"
                                >
                                    Save
                                </StatefulButton>
                            </div>
                        )}
                    </Mutation>
                </Paper>
                <div className={styles.rightSpace} />
            </div>
        );
    }
}

export default withApollo(withRouter(withSnackbar(ArticleEditor)));
