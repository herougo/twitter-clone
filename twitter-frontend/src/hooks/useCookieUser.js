import { useState } from "react";
import { getCookie, setCookie } from '../lib/cookies';

const USER_ID_COOKIE_NAME = 'user_id';
const USERNAME_COOKIE_NAME = 'username';
const TOKEN_COOKIE_NAME = 'jwt_token';

const useCookieUser = () => {
    const userIdCookieVal = getCookie(USER_ID_COOKIE_NAME);
    const usernameCookieVal = getCookie(USERNAME_COOKIE_NAME);
    const tokenCookieVal = getCookie(TOKEN_COOKIE_NAME);
    let defaultUser = null;
    if (tokenCookieVal) {
        defaultUser = {id: userIdCookieVal, username: usernameCookieVal, token: tokenCookieVal};
    }

    const [user, setUser] = useState(defaultUser);
    
    const newSetUser = (val) => {
        if (val === null) {
            setCookie(USER_ID_COOKIE_NAME, '');
            setCookie(USERNAME_COOKIE_NAME, '');
            setCookie(TOKEN_COOKIE_NAME, '');
        } else {
            setCookie(USER_ID_COOKIE_NAME, val.id);
            setCookie(USERNAME_COOKIE_NAME, val.username);
            setCookie(TOKEN_COOKIE_NAME, val.token);
        }
        setUser(val);
    }
    
    return {user, setUser: newSetUser};
}

export default useCookieUser;