import createStore from 'react-auth-kit/createStore';

interface IUserData {
    fName: string;
    role: string;
};

export const store = createStore<IUserData>({
    authName: '_auth',
    authType: 'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === 'https:'
})