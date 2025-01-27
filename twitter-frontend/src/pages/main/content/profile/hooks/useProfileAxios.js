import { useContext } from 'react';
import useAxiosWrapper from '../../../../../hooks/useAxiosWrapper';
import UserContext from '../../../../../context/UserContext';

const useProfileAxios = (username) => {
    const {user} = useContext(UserContext);
    const { loading, error, value } = useAxiosWrapper(
        'get', {}, `/profile/${username}?loggedInUserId=${user.id}`, null, [username]
    );

    return {
        loading, error, value
    };
}

export default useProfileAxios;
