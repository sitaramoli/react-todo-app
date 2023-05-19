import { useCookies } from "react-cookie";

export const useAuthCookie = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['authenticated']);

    const setAuthCookie = () => {
        setCookie('authenticated', true, { path: '/', maxAge: 86400 });
    }

    const removeAuthCookie = () => {
        removeCookie('authenticated', false, { path: '/' });
    };

    const getAuthCookie = () => {
        return cookies['authenticated'];
    };
    return { setAuthCookie, removeAuthCookie, getAuthCookie };
};