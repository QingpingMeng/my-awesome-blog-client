export const authStore = {
    defaults: {
        authStore: {
            __typename: 'AuthStore',
            currentUser: {
                __typename: 'CurrentUser'
            },
            isLoggedIn: false
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
                        currentUser: undefined,
                        isLoggedIn: false
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
                            __typename: 'CurrentUser'
                        },
                        isLoggedIn: true
                    }
                };
                cache.writeData({ data });
                return null;
            }
        }
    }
};