import SlateEditor from 'canner-slate-editor';
import React, { Component } from 'react';

import 'antd/dist/antd.min.css';

class RichTextEditor extends Component {
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
