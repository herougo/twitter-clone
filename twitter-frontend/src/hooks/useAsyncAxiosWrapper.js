import useAsync from './useAsync';
import axiosWrapper from '../lib/axiosWrapper';
import useAxiosWrapper from './useAxiosWrapper';

// Inspired by https://github.com/WebDevSimplified/useful-custom-react-hooks/blob/main/src/10-useFetch/FetchComponent.js

const useAsyncAxiosWrapper = (method, data, urlSuffix, extraParams = null, dependencies = []) => {
    const { axiosWithHeader } = useAxiosWrapper();

    return useAsync(() => {
        return axiosWithHeader(method, data, urlSuffix, extraParams).then(res => {
            return res.data;
        });
    }, dependencies);
}

export default useAsyncAxiosWrapper;
