import { useContext } from 'react';
import useAsyncAxiosWrapper from '../../../../../../hooks/useAsyncAxiosWrapper'
import UserContext from '../../../../../../context/UserContext';

const useChannelGet = () => {
    const {user, setUser} = useContext(UserContext);

    const { loading, error, value, setValue } = useAsyncAxiosWrapper(
        'get',
        {},
        `/channel`,
        null,
        [user]
    );

    return {
        loading, error, value
    };
}

export default useChannelGet;
