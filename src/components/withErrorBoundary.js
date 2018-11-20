import * as Sentry from '@sentry/browser';
import React, { Component } from 'react';

export const withErrorBoundary = WrappedComponent =>
    class extends Component {
        constructor(props) {
            super(props);
            this.state = { error: null, errorInfo: null };
        }

        componentDidCatch = (error, errorInfo) => {
            this.setState({ error });
            Sentry.withScope(scope => {
                Object.keys(errorInfo).forEach(key => {
                    scope.setExtra(key, errorInfo[key]);
                });
                Sentry.captureException(error);
            });
        };

        render() {
            if (this.state.error) {
                return (
                    <div
                        style={{
                            maxWidth: '700px',
                            margin: 'auto',
                            textAlign: 'center'
                        }}
                    >
                        <h2>
                            Something went wrong. Please retry or report this
                            issue.
                        </h2>
                        <button
                            style={{
                                border: 'solid 1px',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                padding: '4px 10px'
                            }}
                            onClick={() => Sentry.showReportDialog()}
                        >
                            Report feedback
                        </button>
                    </div>
                );
            } else {
                return <WrappedComponent {...this.props} />;
            } // Normally, just render children
        }
    };
