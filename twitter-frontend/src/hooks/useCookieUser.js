import { useState } from "react";
import { getCookie, setCookie } from '../lib/cookies';

const COOKIE_NAME = 'jwt_token';

const useCookieUser = () => {
    const [user, setUser] = useState(getCookie(COOKIE_NAME) || null);
    
    const newSetUser = (val) => {
        if (val === null) {
            setCookie(COOKIE_NAME, null);
        } else {
            setCookie(COOKIE_NAME, val.token);
        }
        setUser(val);
    }
    
    return {user, setUser: newSetUser};
}

export default useCookieUser;