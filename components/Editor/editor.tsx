import { Value, Change } from 'slate';
import * as React from 'react';

let SlateEditor = null;
if (process.browser) {
    console.log(require('canner-slate-editor'));
    SlateEditor = require('canner-slate-editor').default;
}

interface EditorProps {
    value: Value;
    onChange: (change: Change) => void;
}

class RichTextEditor extends React.Component<EditorProps> {
    public render() {
        if (SlateEditor) {
            return (
                <SlateEditor
                    // renderNode={this.renderNode}
                    value={this.props.value}
                    // onKeyDown={this.onKeyDown}
                    onChange={this.props.onChange}
                />
            );
        } else {
            return <div>loading editor...</div>;
        }
    }
}

export default RichTextEditor;
