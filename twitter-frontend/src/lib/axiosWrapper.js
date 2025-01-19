import axios from 'axios';
import CONFIG from './config';

const axiosWrapper = async (method, data, urlSuffix, extraParams) => {
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

    try {
        const res = await axios(axiosData);
        return res;
    } catch (err) {
        if (!err.response) {
            throw new Error('Cannot reach server');
        } else if (!err.response.data.errors) {
            if (err.response.status === 404) {
                throw new Error("Not Found")
            }
            throw new Error("Unknown error");
        } else {
            const errorMessage = err.response.data.errors.message;
            throw new Error(errorMessage);
        }
    }
}

export default axiosWrapper;