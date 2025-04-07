import React, { useContext } from 'react';
import useAsyncAxiosWrapper from '../../../../../hooks/useAsyncAxiosWrapper';
import UserContext from '../../../../../context/UserContext';

const usePostsFullFeedAxios = () => {
    const {user, setUser} = useContext(UserContext);

    const { loading, error, value, setValue } = useAsyncAxiosWrapper(
        'get',
        {},
        `/post/feed`,
        null,
        [user]
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

export default usePostsFullFeedAxios;
