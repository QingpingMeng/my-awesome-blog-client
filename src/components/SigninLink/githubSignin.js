import React from 'react';
import Button from '@material-ui/core/Button';
import { githubClientId } from '../../config/app.config';

import * as styles from './styles.module.css';

const GithubSignin = ({ size }) => {
    const githubLink = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&scope=user:mail`;
    return (
        <Button color="inherit" href={githubLink}>
            <img
                alt="profile"
                className={styles.icon}
                height={size}
                width={size}
                src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg"
            />
            Sign in with Github
        </Button>
    );
};

export default GithubSignin;
