import * as React from 'react';
import { IUser } from '../../localStore/authStore';
import Router from 'next/router';
import App from 'components/App/app';

export interface IAppProps {}

interface intialProps {
    user: IUser;
}

export default class IApp extends React.Component<IAppProps, any> {
    static getInitialProps = async ({ query }) => {
        const user = await fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code: query.code })
        }).then(res => res.json());
        return Promise.resolve({ user });
    };

    get initialProps() {
        return this.props as intialProps;
    }
    public render() {
        if (process.browser) {
            window.localStorage.setItem('jwt', this.initialProps.user.token);
            Router.replace('/');
        }
        return (
            <App>
                <div>
                    Signing in...
                </div>
            </App>
        );
    }
}
