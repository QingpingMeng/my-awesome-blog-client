import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import StatefullButton from '../Button/statefulButton';
import REFRESH_ARTICLE_LIST from '../../lib/queries/refreshList';

const DELETE_ARTICLE = gql`
    mutation DeleteArticle($slug: String!) {
        deleteArticle(slug: $slug) {
            id
        }
    }
`;

const ConfirmDialog = props => {
    const { isOpen, onClose, onConfirm, isLoading } = props;
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {'Confirm to delete this article?'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    This operation cannot be reversed. Are you sure?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="default" autoFocus>
                    Cancel
                </Button>
                <StatefullButton
                    loading={isLoading}
                    onClick={onConfirm}
                    color="primary"
                >
                    Confirm
                </StatefullButton>
            </DialogActions>
        </Dialog>
    );
};

class DeleteArticle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            confirmDialogOpen: false
        };
    }

    hideConfirmDialog = () => {
        this.setState({
            confirmDialogOpen: false
        });
    };

    showConfirmDialog = () => {
        this.setState({
            confirmDialogOpen: true
        });
    };

    render() {
        return (
            <Mutation
                mutation={DELETE_ARTICLE}
                onCompleted={this.props.onDeleted}
                awaitRefetchQueries={true}
                refetchQueries={() => [REFRESH_ARTICLE_LIST]}
                variables={{ slug: this.props.slug }}
            >
                {(deleteArticle, { data, loading }) => (
                    <Fragment>
                        <Button
                            mini
                            onClick={() => this.showConfirmDialog()}
                            variant="fab"
                            aria-label="Delete"
                        >
                            <DeleteIcon />
                        </Button>
                        <ConfirmDialog
                            isOpen={this.state.confirmDialogOpen}
                            onClose={this.hideConfirmDialog}
                            onConfirm={deleteArticle}
                            isLoading={loading}
                        />
                    </Fragment>
                )}
            </Mutation>
        );
    }
}

export default DeleteArticle;
