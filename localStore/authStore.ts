import { InMemoryCache } from 'apollo-boost';

export interface IUser {
    username: string;
    id: string;
    avatar: string;
    isGuestUser: boolean;
    isBlogOwner: boolean;
}

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
            logout: (_, __, { cache }: { cache: InMemoryCache }) => {
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
            setCurrentUser: (_, args, { cache }: { cache: InMemoryCache }) => {
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
