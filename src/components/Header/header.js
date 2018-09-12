import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import UserInfo from './userInfo';
import { withRouter } from 'react-router';

class Header extends React.Component {
    goHome = () => {
        this.props.history.push('/');
    };

    render() {
        return (
            <AppBar position="fixed" color="light">
                <Toolbar>
                    <Button type="flat" onClick={() => {
                        this.props.history.push('/');
                    }}>
                        <Typography variant="title" color="inherit">
                            My Awesome Blog
                        </Typography>
                    </Button>
                    <div
                        style={{
                            flexGrow: 1
                        }}
                    />
                    <Button
                        onClick={() => {
                            this.props.history.push('/articles/new');
                        }}
                    >
                        New Post{' '}
                    </Button>
                    <Button>{`<About />`}</Button>
                    <UserInfo />
                </Toolbar>
            </AppBar>
        );
    }
}

export default withRouter(Header);
