import React from 'react';
import useAsync from './useAsync';
import axiosWrapper from '../lib/axiosWrapper';

// Inspired by https://github.com/WebDevSimplified/useful-custom-react-hooks/blob/main/src/10-useFetch/FetchComponent.js

const useAxiosWrapper = (method, data, urlSuffix, extraParams = null, dependencies = []) => {
    return useAsync(() => {
        return axiosWrapper(method, data, urlSuffix, extraParams).then(res => {
            if ([200, 201].includes(res.status)) {
                return res.data;
            }
            return Promise.reject(res.data);
        });
    }, dependencies);
}

export default useAxiosWrapper;
