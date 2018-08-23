import { Value, Change } from 'slate';
import * as React from 'react';
import dynamic from 'next/dynamic';
// import Editor from 'canner-slate-editor';

interface EditorProps {
    value: Value;
    onChange: (change: Change) => void;
}

class RichTextEditor extends React.Component<EditorProps> {
    private SlateEditor;

    constructor(props: EditorProps) {
        super(props);

        this.SlateEditor = dynamic(import('canner-slate-editor').then(t => {
            console.log(t);
            return t.default;
        }), {
            loading: () => <p>loading editor...</p>,
            ssr: true
        });
    }

    public render() {
        return (
            <this.SlateEditor
                // renderNode={this.renderNode}
                value={this.props.value}
                // onKeyDown={this.onKeyDown}
                onChange={this.props.onChange}
            />
        );
    }
}

export default RichTextEditor;
