import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RichTextEditor from './Components/Editor/editor';
import { Value } from 'slate';

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

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: initialValue
        };
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to
                    reload.
                </p>
                <RichTextEditor
                    value={this.state.value}
                    onChange={({ value }) => this.setState({ value })}
                />
            </div>
        );
    }
}

export default App;
