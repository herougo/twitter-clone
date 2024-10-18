import axiosWrapper from "../../../lib/axiosWrapper";


const logIn = (username, password) => {
    return axiosWrapper('post', {username, password}, '/login');
}

export default logIn;