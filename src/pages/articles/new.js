import { Paper, Button } from '@material-ui/core';
import { Value } from 'slate';
import React from 'react';
import { slateHTMLSerialize } from '../../lib/htmlSerialize';
import { Mutation } from 'react-apollo';
import {withRouter} from 'react-router';

import * as styles from './new.module.css';
import RichTextEditor from '../../components/Editor/editor';
import StatefulButton from '../../components/Button/statefulButton';
import { ArticleInput } from '../../models/articles.model';
import gql from 'graphql-tag';

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
                min: 1,
                max: 1,
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
        const articleInput = new ArticleInput();
        articleInput.body = slateHTMLSerialize(this.state.value);
        articleInput.jsonBody = JSON.stringify(this.state.value.toJSON());
        articleInput.title = this.state.value.document
            .getBlocks()
            .find(block => block.text !== '')
            .text;
        createArticle({ variables: { article: articleInput } });
    };

    onSubmiteSuccess = ({createArticle}) => {
        this.props.history.replace(`/articles/${createArticle.slug}`);
    };

    renderNode = props => {
        if (props.node.type === 'title') {
            return <h1 {...props.attributes}>{props.children}</h1>;
        }
    };

    renderPlaceholder = props => {
        const { node } = props;
        if (node.object !== 'block') return;
        if (node.text !== '') return;
        if (node.type === 'title') {
            return (
                <em
                    contentEditable={false}
                    style={{
                        display: 'inline-block',
                        width: '0',
                        fontSize: '3rem',
                        whiteSpace: 'nowrap',
                        opacity: '0.33'
                    }}
                >
                    Title
                </em>
            );
        }
    };

    render() {
        return (
            <div>
                <div className={styles.leftSpace} />
                <Paper className={styles.paper} elevation={1}>
                    <div className={styles.editor}>
                        <RichTextEditor
                            value={this.state.value}
                            renderPlaceholder={this.renderPlaceholder}
                            renderNode={this.renderNode}
                            onChange={this.onChange}
                        />
                    </div>

                    <Mutation
                        mutation={CREAT_ARTICLE}
                        onCompleted={this.onSubmiteSuccess}
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
