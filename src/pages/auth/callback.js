import * as React from 'react';
import { withRouter } from 'react-router';
import queryString from 'query-string'

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
            'https://awesome-blog-server-bxjuimqehq.now.sh/signin',
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
            .then(data => data.token);
    };

    render() {
        return <div>Signing in...</div>;
    }
}

export default withRouter(AuthCallback);
