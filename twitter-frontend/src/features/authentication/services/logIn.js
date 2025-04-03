const logIn = async ({axiosFunction, payload}) => {
    const {username, password} = payload;
    return await axiosFunction('post', {username, password}, '/login');
}

export default logIn;