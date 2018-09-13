import * as React from 'react';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import { withApollo } from 'react-apollo';

class AuthCallback extends React.Component {
    componentDidMount() {
        this.getAccessToken().then(token => {
            window.localStorage.setItem('jwt', token);
            this.props.history.replace('/');
        });
    }

    getAccessToken = async () => {
        const qs = queryString.parse(this.props.location.search);
        return await fetch(
            'http://localhost:3000/signin',
            {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code: qs.code })
            }
        )
            .then(res => res.json())
            .then(data => {
                this.props.client.writeData({
                    data: {
                        authStore: {
                            __typename: 'AuthStore',
                            currentUser: {
                                ...data,
                                isLoggedIn: true,
                                __typename: 'CurrentUser'
                            }
                        }
                    }
                });
                return data.token;
            });
    };

    render() {
        return <div>Signing in...</div>;
    }
}

export default withApollo(withRouter(AuthCallback));
