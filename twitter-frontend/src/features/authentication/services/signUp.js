import axiosWrapper from "../../../lib/axiosWrapper";


const signUp = async ({username, password, email, firstName, lastName}) => {
    return await axiosWrapper(
        'post',
        {
            user : {username, password, email, firstName, lastName}
        },
        '/signup'
    );
}

export default signUp;