import { useCallback } from "react";
import { useNavigate } from "react-router-dom";


const useLeftNavNavigationCallbacks = () => {
    const navigate = useNavigate();
    const result = {
        home: useCallback((e) => navigate('/')),
        profile: useCallback((e) => navigate('/profile')),
        search: useCallback((e) => navigate('/search')),
        store: useCallback((e) => navigate('/store')),
        notifications: useCallback((e) => navigate('/notifications')),
        messages: useCallback((e) => navigate('/messages'))
    }
    return result;
}

export default useLeftNavNavigationCallbacks;