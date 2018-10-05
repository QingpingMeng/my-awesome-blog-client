import React, { Component } from 'react';
import { Button, withWidth } from '@material-ui/core';

class SocialIcons extends Component {
    render() {
        const { width } = this.props;
        const imageStyle = {
            maxWidth: width === 'xs' ? '75%' : '100%'
        };
        return (
            <div>
                <Button href="https://github.com/QingpingMeng">
                    <img
                        alt="github"
                        style={imageStyle}
                        src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg"
                    />
                </Button>
                <Button href="https://github.com/QingpingMeng">
                    <img
                        alt="linkedin"
                        style={imageStyle}
                        src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/linkedin.svg"
                    />
                </Button>
            </div>
        );
    }
}

export default withWidth()(SocialIcons);
