export const authStore = {
    defaults: {
        authStore: {
            __typename: 'AuthStore',
            currentUser: {
                isLoggedIn: false,
                email: '',
                username: '',
                avatar: '',
                __typename: 'CurrentUser'
            },
        }
    },

    resolvers: {
        Mutation: {
            logout: (_, __, { cache }) => {
                if (process.browser) {
                    window.localStorage.removeItem('jwt');
                }
                const data = {
                    authStore: {
                        __typename: 'AuthStore',
                        currentUser: {
                            isLoggedIn: false,
                            email: '',
                            username: '',
                            avatar: '',
                            __typename: 'CurrentUser'
                        },
                    }
                };
                cache.writeData({ data });
                return null;
            },
            setCurrentUser: (_, args, { cache }) => {
                const userInput = args.user;
                const data = {
                    authStore: {
                        __typename: 'AuthStore',
                        currentUser: {
                            ...userInput,
                            isLoggedIn: true,
                            __typename: 'CurrentUser'
                        },
                    }
                };
                cache.writeData({ data });
                return null;
            }
        }
    }
};