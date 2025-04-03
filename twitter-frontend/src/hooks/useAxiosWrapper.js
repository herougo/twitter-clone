import React, { useContext } from 'react';
import useAsync from './useAsync';
import axiosWrapper from '../lib/axiosWrapper';
import UserContext from '../context/UserContext';

// Inspired by https://github.com/WebDevSimplified/useful-custom-react-hooks/blob/main/src/10-useFetch/FetchComponent.js

const useAxiosWrapper = () => {
    const {user} = useContext(UserContext);

    const axiosWithHeader = async (method, data, urlSuffix, extraParams = null) => {
        let headers = null;
        if (user && user.token) {
            headers = { Authorization: `Bearer ${user.token}` };
        }

        return axiosWrapper(method, data, urlSuffix, headers, extraParams);
    };

    return {axiosWithHeader}
}

export default useAxiosWrapper;
