const signUp = async ({axiosFunction, payload}) => {
    const {username, password, email, firstName, lastName} = payload;

    return await axiosFunction(
        'post',
        {
            user : {username, password, email, firstName, lastName}
        },
        '/signup'
    );
}

export default signUp;