import Cookies from 'js-cookie';

export const setCookies = (token: string) => {
    Cookies.set('token', token, {expires: 999});
};

export const getCookies = () => {
    const token = Cookies.get('token');
    return token === undefined ? false : token;
};

export const delCookies = () => {
    Cookies.remove('token');
};