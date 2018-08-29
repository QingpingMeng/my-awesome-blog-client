import SlateEditor from 'canner-slate-editor';
import * as React from 'react';

class RichTextEditor extends React.Component{
    render() {
        return (
            <SlateEditor
                // renderNode={this.renderNode}
                value={this.props.value}
                // onKeyDown={this.onKeyDown}
                onChange={this.props.onChange}
            />
        );
    }
}

export default RichTextEditor;