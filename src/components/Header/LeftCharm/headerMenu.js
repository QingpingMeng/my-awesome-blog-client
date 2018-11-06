import React, { Component } from 'react';
import { Button, Hidden } from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import DrawerMenu from './drawer';
import UserInfo from './userInfo';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class LeftHeaderMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            drawerOpen: false
        };
    }

    toggleDrawer = (open = false) => {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        });
    };

    render() {
        const { width } = this.props;
        const buttonSize = width === 'xs' ? 'medium' : 'large';
        const HomeLink = props => <Link to="/" {...props} />;
        const AboutLink = props => <Link to="/about" {...props} />;
        const buttons = (
            <React.Fragment>
                <Button
                    type="flat"
                    size={buttonSize}
                    color="primary"
                    component={HomeLink}
                >
                    Home
                </Button>
                <Button color="primary" size={buttonSize} component={AboutLink}>
                    About
                </Button>
                <UserInfo />
            </React.Fragment>
        );
        return (
            <div>
                <Hidden smUp>
                    <DrawerMenu
                        toggleDrawer={this.toggleDrawer}
                        onClose={() => this.setState({ drawerOpen: false })}
                        isOpen={this.state.drawerOpen}
                    >
                        {buttons}
                    </DrawerMenu>
                </Hidden>
                <Hidden only="xs">{buttons}</Hidden>
            </div>
        );
    }
}

export default withRouter(withWidth()(LeftHeaderMenu));
