import Html from 'slate-html-serializer';
import blockRule from './blockRule';
import inlineRule from './inlineRule';
import markRule from './markRule';

const rules = [
    blockRule,
    inlineRule,
    markRule
]

const html = new Html({ rules });

export const slateHTMLSerialize = html.serialize;