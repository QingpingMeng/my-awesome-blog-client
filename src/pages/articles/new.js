import { Paper, Button } from '@material-ui/core';
import { Value } from 'slate';
import React from 'react';
import Html from 'slate-html-serializer';

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

const rules = [
    {
        serialize(obj, children) {
            if (obj.object === 'block') {
                console.log('block:', obj.type, obj.data.size);
                switch (obj.type) {
                    case 'code_line':
                        return <span>{children}</span>;
                    case 'code_block':
                        return (
                            <pre>
                                <code
                                    className={`language-${obj.data.get(
                                        'syntax'
                                    )}`}
                                >
                                    {children}
                                </code>
                            </pre>
                        );
                    case 'table':
                        return <table>{children}</table>
                    case 'table_row':
                        return <tr>{children}</tr>
                    case 'table_cell':
                        return <td>{children}</td>
                    case 'paragraph':
                        return (
                            <p className={obj.data.get('className')}>
                                {children}
                            </p>
                        );
                    case 'header_one':
                        return <h1>{children}</h1>;
                    case 'header_two':
                        return <h2>{children}</h2>;
                    case 'header_three':
                        return <h3>{children}</h3>;
                    case 'header_four':
                        return <h4>{children}</h4>;
                    case 'header_five':
                        return <h5>{children}</h5>;
                    case 'header_six':
                        return <h6>{children}</h6>;
                    case 'blockquote':
                        return <blockquote>{children}</blockquote>;
                    case 'list_item':
                        return <li>{children}</li>;
                    case 'unordered_list':
                        return <ul>{children}</ul>;
                    case 'ordered_list':
                        return <ol>{children}</ol>;
                    default:
                        return (
                            <div className={obj.data.get('className')}>
                                {children}
                            </div>
                        );
                }
            }
        }
    },
    {
        serialize(obj, children) {
            if (obj.object === 'inline') {
                console.log('inline:', obj.type);
                switch (obj.type.toLowerCase()) {
                    case 'link':
                        return (
                            <a href={obj.data.get('href').split(' ')[0]}>
                                {children}
                            </a>
                        );
                    case 'image':
                        if (obj.data.size === 3) {
                            // add image from tool bar
                            return (
                                <img
                                    src={obj.data.get('src')[0]}
                                    alt="img"
                                    width={obj.data.get('width')}
                                    height={obj.data.get('height')}
                                />
                            );
                        } else {
                            // add image from markdown syntax
                            return (
                                <img
                                    src={obj.data.get('src').split(' ')[0]}
                                    alt={'img'}
                                />
                            );
                        }
                    default:
                        return <div>{children}</div>;
                }
            }
        }
    },
    // Add a new rule that handles marks...
    {
        serialize(obj, children) {
            if (obj.object === 'mark') {
                console.log('mark:', obj.type);
                switch (obj.type.toLowerCase()) {
                    case 'bold':
                        return <strong>{children}</strong>;
                    case 'italic':
                        return <em>{children}</em>;
                    case 'underline':
                        return <u>{children}</u>;
                    case 'strike':
                        return <strike>{children}</strike>;
                    // case 'fontcolor':
                    //     return <
                    default:
                        return undefined;
                }
            }
        }
    }
];

const html = new Html({ rules });

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
        const string = html.serialize(this.state.value);
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
                        <Button
                            variant="contained"
                            onClick={this.onSubmit}
                            color="primary"
                        >
                            Submit
                        </Button>
                    </div>
                </Paper>
                <div className={styles.rightSpace} />
            </div>
        );
    }
}

export default NewArticle;
