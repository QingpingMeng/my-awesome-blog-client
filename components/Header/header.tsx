import * as React from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import UserInfo from './userInfo';
import Link from 'next/link';

Router.onRouteChangeStart = url => {
    console.log(`Loading: ${url}`);
    NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

export interface IHeaderProps {}

class Header extends React.Component<IHeaderProps, any> {
    public render() {
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
                    <Link prefetch href="/articles/new">
                        <Button>New Post </Button>
                    </Link>

                    <UserInfo />
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;
