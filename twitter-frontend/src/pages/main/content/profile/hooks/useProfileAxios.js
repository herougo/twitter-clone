import { useContext } from 'react';
import useAxiosWrapper from '../../../../../hooks/useAxiosWrapper';
import UserContext from '../../../../../context/UserContext';

const useProfileAxios = (username) => {
    const {user} = useContext(UserContext);
    const { loading, error, value, setValue } = useAxiosWrapper(
        'get', {}, `/profile/${username}?loggedInUserId=${user.id}`, null, [username]
    );

    return {
        loading, error, value, setValue
    };
}

export default useProfileAxios;
