import SlateEditor from 'canner-slate-editor';
import * as React from 'react';

import 'antd/dist/antd.min.css';

class RichTextEditor extends React.Component {
    render() {
        return (
            <SlateEditor
                value={this.props.value}
                renderNode={this.props.renderNode}
                onChange={this.props.onChange}
            />
        );
    }
}

export default RichTextEditor;
