import axiosWrapper from "../../../lib/axiosWrapper";


const signUp = ({username, password, email, firstName, lastName}) => {
    return axiosWrapper(
        'post',
        {
            user : {username, password, email, firstName, lastName}
        },
        '/signup'
    );
}

export default signUp;