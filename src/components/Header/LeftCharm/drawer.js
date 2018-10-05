import React, { Component } from 'react';
import { Drawer, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

export default class DrawerMenu extends Component {
    render() {
        return (
            <div>
                <IconButton
                    onClick={this.props.toggleDrawer}
                    onKeyDown={this.props.toggleDrawer}
                    color="inherit"
                    aria-label="Menu"
                >
                    <MenuIcon />
                </IconButton>
                <Drawer
                    anchor="bottom"
                    style={{
                        display: 'grid',
                        gridAutoRows: 'min-content'
                    }}
                    tabIndex={0}
                    role="button"
                    open={this.props.isOpen}
                    onClose={this.props.onClose}
                >
                    {this.props.children}
                </Drawer>
            </div>
        );
    }
}
