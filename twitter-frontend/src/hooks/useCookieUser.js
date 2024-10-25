import { useState } from "react";
import { getCookie, setCookie } from '../lib/cookies';

const COOKIE_NAME = 'jwt_token';

const useCookieUser = () => {
    const cookieVal = getCookie(COOKIE_NAME);
    let defaultUser = null;
    if (cookieVal) {
        defaultUser = {token: cookieVal};
    }

    const [user, setUser] = useState(defaultUser);
    
    const newSetUser = (val) => {
        if (val === null) {
            setCookie(COOKIE_NAME, '');
        } else {
            setCookie(COOKIE_NAME, val.token);
        }
        setUser(val);
    }
    
    return {user, setUser: newSetUser};
}

export default useCookieUser;