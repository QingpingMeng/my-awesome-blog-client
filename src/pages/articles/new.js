import { Paper, Button } from '@material-ui/core';
import { Value } from 'slate';
import React from 'react';
import { slateHTMLSerialize } from '../../lib/htmlSerialize';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router';

import * as styles from './new.module.css';
import RichTextEditor from '../../components/Editor/editor';
import StatefulButton from '../../components/Button/statefulButton';
import { ArticleInput } from '../../models/articles.model';
import gql from 'graphql-tag';
import REFRESH_ARTICLE_LIST from '../../lib/queries/refreshList';

const CREAT_ARTICLE = gql`
    mutation Create_Article($article: ArticleInput!) {
        createArticle(article: $article) {
            id
            slug
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

class NewArticle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: initialValue
        };
    }

    onChange = ({ value }) => {
        this.setState({ value });
    };

    onSubmit = createArticle => {
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
        createArticle({ variables: { article: articleInput } });
    };

    onSubmiteSuccess = ({ createArticle }) => {
        this.props.history.replace(`/articles/${createArticle.slug}`);
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
                        mutation={CREAT_ARTICLE}
                        onCompleted={this.onSubmiteSuccess}
                        refetchQueries={() => [REFRESH_ARTICLE_LIST]}
                    >
                        {(createArticle, { data, loading }) => (
                            <div className={styles.buttons}>
                                <div />

                                <StatefulButton
                                    variant="contained"
                                    loading={loading}
                                    loadingSize={20}
                                    onClick={e => this.onSubmit(createArticle)}
                                    color="primary"
                                >
                                    Submit
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

export default withRouter(NewArticle);
