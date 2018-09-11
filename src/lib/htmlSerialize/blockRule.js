import React from 'react';

export default  {
    serialize(obj, children) {
        if (obj.object === 'block') {
            console.log('block:', obj.type, obj.data.size);
            switch (obj.type) {
                case 'hr':
                    return <hr />;
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
                    return <table>{children}</table>;
                case 'table_row':
                    return <tr>{children}</tr>;
                case 'table_cell':
                    return <td>{children}</td>;
                case 'summary':
                    return  <p
                    className="summary"
                >
                    {children}
                </p>
                case 'paragraph':
                    const style = {};
                    if (obj.data.get('align')) {
                        style.textAlign = obj.get.get('align');
                    }

                    // 3rem padding left per 1 indent
                    if (obj.data.get('indent')) {
                        style.paddingLeft = `${obj.data.get(
                            'indent') * 3
                        }rem`;
                    }

                    return (
                        <p
                            style={style}
                            className={obj.data.get('className')}
                        >
                            {children}
                        </p>
                    );
                case 'title':
                    return <h1 className="title">{children}</h1>
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
}