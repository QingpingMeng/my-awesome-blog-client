import React from 'react';

export default {
    serialize(obj, children) {
        if (obj.object === 'inline') {
            console.log('inline:', obj.type);
            switch (obj.type.toLowerCase()) {
                case 'link':
                    return (
                        <a href={obj.data.get('href').split(' ')[0]}>
                            {children}
                        </a>
                    );
                case 'image':
                    if (obj.data.size === 3) {
                        // add image from tool bar
                        return (
                            <img
                                src={obj.data.get('src')[0]}
                                alt="img"
                                width={obj.data.get('width')}
                                height={obj.data.get('height')}
                            />
                        );
                    } else {
                        // add image from markdown syntax
                        return (
                            <img
                                src={obj.data.get('src').split(' ')[0]}
                                alt={'img'}
                            />
                        );
                    }
                default:
                    return <div>{children}</div>;
            }
        }
    }
}