import { useContext } from 'react';
import useAsyncAxiosWrapper from '../../../../../hooks/useAsyncAxiosWrapper';
import UserContext from '../../../../../context/UserContext';

const useProfileAxios = (username) => {
    const {user} = useContext(UserContext);
    const { loading, error, value, setValue } = useAsyncAxiosWrapper(
        'get', {}, `/profile/${username}?loggedInUserId=${user.id}`, null, [username]
    );

    return {
        loading, error, value, setValue
    };
}

export default useProfileAxios;
