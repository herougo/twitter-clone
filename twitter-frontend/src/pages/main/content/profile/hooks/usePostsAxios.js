import React, { useContext } from 'react';
import useAsyncAxiosWrapper from '../../../../../hooks/useAsyncAxiosWrapper';
import UserContext from '../../../../../context/UserContext';

const usePostsAxios = (username) => {
    const {user, setUser} = useContext(UserContext);

    const { loading, error, value, setValue } = useAsyncAxiosWrapper(
        'get',
        {},
        `/user/name/${username}/post`,
        null,
        [username, user]
    );

    const setPostBuilder = (i) => {
        return (post) => {
            const valueCopy = JSON.parse(JSON.stringify(value));
            valueCopy[i] = post;
            setValue(valueCopy);
        }
    }

    return {
        loading, error, value, setPostBuilder
    };
}

export default usePostsAxios;
