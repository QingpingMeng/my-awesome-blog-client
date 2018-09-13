import React from 'react';

export default  {
    serialize(obj, children) {
        if (obj.object === 'mark') {
            switch (obj.type.toLowerCase()) {
                case 'bold':
                    return <strong>{children}</strong>;
                case 'italic':
                    return <em>{children}</em>;
                case 'underline':
                    return <u>{children}</u>;
                case 'strikethrough':
                    return <del>{children}</del>;
                case 'fontcolor':
                    let colorStyle = {};
                    if(obj.data.get('color')){
                        colorStyle.color = obj.data.get('color').color;
                    }
                    return <span style={colorStyle}>{children}</span>
                case 'fontbgcolor':
                    let bgColorstyle = {};
                    if(obj.data.get('color')){
                        bgColorstyle.backgroundColor = obj.data.get('color').color;
                    }
                    return <span style={bgColorstyle}>{children}</span>
                default:
                    return undefined;
            }
        }
    }
}