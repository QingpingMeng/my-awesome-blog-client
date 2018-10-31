import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LeftHeaderMenu from './LeftCharm/headerMenu';
import RightCharm from './RightCharm';

class Header extends React.Component {
    goHome = () => {
        this.props.history.push('/');
    };

    // todo: use breakpoints for better resposive display
    render() {
        return (
            <AppBar position="fixed" color="light">
                <Toolbar>
                    <LeftHeaderMenu />
                    <div style={{ flex: '1' }} />
                    <RightCharm />
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;
