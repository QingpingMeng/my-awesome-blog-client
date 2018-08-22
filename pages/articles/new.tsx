import App from '../../components/App/app';
import { Paper } from '@material-ui/core';
import { Value } from 'slate';
import * as React from 'react';

import * as styles from './styles.scss';
import RichTextEditor from 'components/Editor/editor';

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                key: 'Title',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: 'Give your story a title.',
                                object: null
                            }
                        ]
                    }
                ]
            },
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        key: 'Body',
                        leaves: [
                            {
                                text: 'start your story here...',
                                object: null
                            }
                        ]
                    }
                ]
            }
        ]
    }
});

interface NewArticleState{
    value: Value;
}

class NewArticle extends React.Component<{}, NewArticleState> {
    

    constructor(props){
        super(props);

        this.state = {
            value: initialValue
        };
    }

    private onChange = ({value}) => {
        this.setState({value});
    }

    public render() {
        return (
            <App>
                <div className={styles.editorContainer}>
                    <div className={styles.leftSpace} />
                    <Paper className={styles.editorPaper} elevation={1}>
                        <RichTextEditor value={this.state.value} onChange={this.onChange} />
                    </Paper>
                    <div className={styles.rightSpace} />
                </div>
            </App>
        );
    }
}

export default NewArticle;
