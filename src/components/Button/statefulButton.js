import { Button } from '@material-ui/core';
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const StatefullButton = props => {
    const { loading, onClick, ...rest } = props;
    return (
        <Button {...rest} disabled={loading} onClick={onClick}>
            {!loading && props.children}
            {loading && (
                <CircularProgress size={props.loadingSize || 50} />
            )}
        </Button>
    );
};

export default StatefullButton;