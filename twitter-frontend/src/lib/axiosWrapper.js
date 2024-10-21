import axios from 'axios';
import CONFIG from './config';

const axiosWrapper = (method, data, urlSuffix, extraParams) => {
    if (!urlSuffix.startsWith('/')) {
        throw new Error('urlSuffix must start with a slash');
    }
    const url = `${CONFIG.backendBaseURL}${urlSuffix}`;
    console.log(`${method.toUpperCase()} ${url}`);
    
    let axiosData = {
        method: method,
        data: data,
        url: url
    };
    if (extraParams) {
        axiosData = {...axiosData, ...extraParams};
    }

    return axios(axiosData);
}

export default axiosWrapper;