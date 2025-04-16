import { useState } from "react";
import { getCookie, setCookie } from '../lib/cookies';

const USER_ID_COOKIE_NAME = 'user_id';
const USERNAME_COOKIE_NAME = 'username';
const TOKEN_COOKIE_NAME = 'jwt_token';
const PROFILE_PIC_PATH_COOKIE_NAME = 'profile_pic_path';

const useCookieUser = () => {
    const userIdCookieVal = getCookie(USER_ID_COOKIE_NAME);
    const usernameCookieVal = getCookie(USERNAME_COOKIE_NAME);
    const tokenCookieVal = getCookie(TOKEN_COOKIE_NAME);
    const profilePicPathCookieVal = getCookie(PROFILE_PIC_PATH_COOKIE_NAME);
    let defaultUser = null;
    if (tokenCookieVal) {
        defaultUser = {
            id: userIdCookieVal,
            username: usernameCookieVal,
            token: tokenCookieVal,
            profilePicPath: profilePicPathCookieVal
        };
    }

    const [user, setUser] = useState(defaultUser);
    
    const newSetUser = (val) => {
        if (val === null) {
            setCookie(USER_ID_COOKIE_NAME, '');
            setCookie(USERNAME_COOKIE_NAME, '');
            setCookie(TOKEN_COOKIE_NAME, '');
            setCookie(PROFILE_PIC_PATH_COOKIE_NAME, '');
        } else {
            setCookie(USER_ID_COOKIE_NAME, val.id);
            setCookie(USERNAME_COOKIE_NAME, val.username);
            setCookie(TOKEN_COOKIE_NAME, val.token);
            setCookie(PROFILE_PIC_PATH_COOKIE_NAME, val.profilePicPath);
        }
        setUser(val);
    }
    
    return {user, setUser: newSetUser};
}

export default useCookieUser;