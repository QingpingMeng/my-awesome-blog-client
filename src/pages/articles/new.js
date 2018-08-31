import { Paper, Button } from '@material-ui/core';
import { Value } from 'slate';
import React from 'react';
import { slateHTMLSerialize } from '../../lib/htmlSerialize';

import * as styles from './styles.module.css';
import RichTextEditor from '../../components/Editor/editor';

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

    onSubmit = () => {
        const string = slateHTMLSerialize(this.state.value);
        localStorage.setItem('content', string);
    };

    render() {
        return (
            <div className={styles.editorContainer}>
                <div className={styles.leftSpace} />
                <Paper className={styles.paper} elevation={1}>
                    <div className={styles.editor}>
                        <RichTextEditor
                            value={this.state.value}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className={styles.buttons}>
                        <div />
                        <Button
                            variant="contained"
                            onClick={this.onSubmit}
                            color="primary"
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            onClick={this.onSubmit}
                            color="secondary"
                        >
                            Save
                        </Button>
                    </div>
                </Paper>
                <div className={styles.rightSpace} />
            </div>
        );
    }
}

export default NewArticle;
