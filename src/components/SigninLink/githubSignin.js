import React from 'react';
import Button from '@material-ui/core/Button';

import * as styles from './styles.module.css';

const GithubSignin = ({ size }) => {
    const githubLink = `https://github.com/login/oauth/authorize?client_id=5a23c310903a1d2675cc&scope=user:mail`;
    return (
        <Button color="inherit" href={githubLink}>
            <img
                alt="profile"
                className={styles.icon}
                height={size}
                width={size}
                src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg"
            />Sign in with Github
        </Button>
    );
};

export default GithubSignin;