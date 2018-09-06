import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import UserInfo from './userInfo';
import { withRouter } from 'react-router';

class Header extends React.Component {
    goHome = () => {
        this.props.history.push('/');
    };

    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="title"
                        color="inherit"
                        style={{
                            flexGrow: 1
                        }}
                    >
                        My Awesome Blog
                    </Typography>

                    <Button
                        onClick={() => {
                            this.props.history.push('/articles/new');
                        }}
                    >
                        New Post{' '}
                    </Button>

                    <UserInfo />
                </Toolbar>
            </AppBar>
        );
    }
}

export default withRouter(Header);
