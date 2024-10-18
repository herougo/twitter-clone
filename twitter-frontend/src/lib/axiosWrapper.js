import axios from 'axios';
import CONFIG from './config';

const axiosWrapper = (method, data, urlSuffix, extraParams) => {
    if (!urlSuffix.startsWith('/')) {
        throw new Error('urlSuffix must start with a slash');
    }

    console.log(`${method.toUpperCase()} ${urlSuffix}`);
    
    let payload = {
        method: method,
        data: data,
        url: `${CONFIG.backendBaseURL}${urlSuffix}`
    };
    if (extraParams) {
        payload = {...payload, ...extraParams};
    }

    return axios(payload);
}

export default axiosWrapper;