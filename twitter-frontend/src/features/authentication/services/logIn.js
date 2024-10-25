import axiosWrapper from "../../../lib/axiosWrapper";


const logIn = async ({username, password}) => {
    return await axiosWrapper('post', {username, password}, '/login');
}

export default logIn;