import Prism from 'prismjs';

const lang = /\blang(?:uage)?-([\w-]+)\b/i;

export const syntaxHighlight = root => {
    const allCodeBlocks = root.querySelectorAll(
        'code[class*="language-"], pre[class*="language-"]'
    );
    allCodeBlocks.forEach(codeBlock => {
        const syntax = (codeBlock.className.match(lang) || [
            '',
            ''
        ])[1].toLowerCase();

        try {
            require(`prismjs/components/prism-${syntax}`);
        } catch (err) {}

        const grammar = Prism.languages[syntax];
        if (!grammar) {
            return;
        }

        const codeLines = codeBlock.querySelectorAll('div');
        codeLines.forEach(codeLine => {
            codeLine.innerHTML = Prism.highlight(
                codeLine.innerHTML,
                grammar
            )
          
            if(syntax === 'html'){
                codeLine.innerHTML = codeLine.innerHTML
                .replace('&amp;lt;', '<')
                .replace('&amp;gt;', '>');
            }
        });
    });
};