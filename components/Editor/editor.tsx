import { Value, Change } from 'slate';
import * as React from 'react';
import dynamic from 'next/dynamic';
import { RenderNodeProps } from '../../node_modules/@types/slate-react';

interface EditorProps {
    value: Value;
    onChange: (change: Change) => void;
}

class RichTextEditor extends React.Component<EditorProps> {
    private SlateEditor;

    private getType = (chars: string) => {
        switch (chars) {
            case '*':
            case '-':
            case '+':
                return 'list-item';
            case '>':
                return 'block-quote';
            case '#':
                return 'heading-one';
            case '##':
                return 'heading-two';
            case '###':
                return 'heading-three';
            case '####':
                return 'heading-four';
            case '#####':
                return 'heading-five';
            case '######':
                return 'heading-six';
            case '```':
                return 'code'
            default:
                return null;
        }
    };

    private renderNode = (props: RenderNodeProps) => {
        const { attributes, children, node } = props;

        switch (node.type) {
            case 'block-quote':
                return <blockquote {...attributes}>{children}</blockquote>;
            case 'bulleted-list':
                return <ul {...attributes}>{children}</ul>;
            case 'heading-one':
                return <h1 {...attributes}>{children}</h1>;
            case 'heading-two':
                return <h2 {...attributes}>{children}</h2>;
            case 'heading-three':
                return <h3 {...attributes}>{children}</h3>;
            case 'heading-four':
                return <h4 {...attributes}>{children}</h4>;
            case 'heading-five':
                return <h5 {...attributes}>{children}</h5>;
            case 'heading-six':
                return <h6 {...attributes}>{children}</h6>;
            case 'list-item':
                return <li {...attributes}>{children}</li>;
            case 'code':
                return <pre {...attributes}>{children}</pre>
        }
    };

    private onKeyDown = (event: Event, change: Change) => {
        switch (event.key) {
            case ' ':
                return this.onSpace(event, change);
            case 'Backspace':
                return this.onBackspace(event, change);
            case 'Enter':
                return this.onEnter(event, change);
        }
    };

    private onSpace = (event: Event, change: Change) => {
        const { value } = change;
        const { selection } = value;
        if (selection.isExpanded) return;

        const { startBlock } = value;
        const { start } = selection;
        const chars = startBlock.text
            .slice(0, start.offset)
            .replace(/\s*/g, '');
        const type = this.getType(chars);

        if (!type) return;
        if (type == 'list-item' && startBlock.type == 'list-item') return;
        event.preventDefault();

        change.setBlocks(type);

        if (type == 'list-item') {
            change.wrapBlock('bulleted-list');
        }

        change.moveFocusToStartOf(startBlock).delete();
        return true;
    };

    private onEnter = (event, change) => {
        const { value } = change;
        const { selection } = value;
        const { start, end, isExpanded } = selection;
        if (isExpanded) return;

        const { startBlock } = value;
        if (start.offset == 0 && startBlock.text.length == 0)
            return this.onBackspace(event, change);
        if (end.offset != startBlock.text.length) return;

        if (
            startBlock.type != 'heading-one' &&
            startBlock.type != 'heading-two' &&
            startBlock.type != 'heading-three' &&
            startBlock.type != 'heading-four' &&
            startBlock.type != 'heading-five' &&
            startBlock.type != 'heading-six' &&
            startBlock.type != 'code' &&
            startBlock.type != 'block-quote'
        ) {
            return;
        }

        event.preventDefault();
        change.splitBlock().setBlocks('paragraph');
        return true;
    };

    private onBackspace = (event: Event, change: Change) => {
        const { value } = change;
        const { selection } = value;
        if (selection.isExpanded) return;
        if (selection.start.offset != 0) return;

        const { startBlock } = value;
        if (startBlock.type == 'paragraph') return;

        event.preventDefault();
        change.setBlocks('paragraph');

        if (startBlock.type == 'list-item') {
            change.unwrapBlock('bulleted-list');
        }

        return true;
    };

    constructor(props: EditorProps) {
        super(props);

        this.SlateEditor = dynamic(import('slate-react').then(t => t.Editor), {
            loading: () => <p>loading editor...</p>,
            ssr: false
        });
    }

    public render() {
        return (
            <this.SlateEditor
                renderNode={this.renderNode}
                value={this.props.value}
                onKeyDown={this.onKeyDown}
                onChange={this.props.onChange}
            />
        );
    }
}

export default RichTextEditor;
