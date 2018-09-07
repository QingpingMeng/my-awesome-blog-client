import { Button } from '@material-ui/core';
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const StatefullButton = props => {
    const { loading, onClick, ...rest } = props;
    return (
        <Button {...rest} disabled={loading || props.disabled} onClick={onClick}>
            {!loading && props.children}
            {loading && (
                <CircularProgress size={props.loadingSize || 20} />
            )}
        </Button>
    );
};

export default StatefullButton;