import axios from 'axios';
import CONFIG from './config';

const axiosWrapper = async (method, data, urlSuffix, headers, extraParams) => {
    if (!urlSuffix.startsWith('/')) {
        throw new Error('urlSuffix must start with a slash');
    }
    const url = `${CONFIG.backendBaseURL}${urlSuffix}`;
    console.log(`${method.toUpperCase()} ${url} ${JSON.stringify(data)}`);
    
    let axiosData = {
        method: method,
        data: data,
        url: url
    };
    if (headers) {
        axiosData.headers = headers;
    }
    if (extraParams) {
        axiosData = {...axiosData, ...extraParams};
    }

    try {
        const res = await axios(axiosData);
        // Note: no need to check for non-2XX because axios automatically
        // triggers an error
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