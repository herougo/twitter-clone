import React, { useCallback, useContext, useState } from 'react';
import useAxiosWrapper from '../../../../../hooks/useAxiosWrapper';
import UserContext from '../../../../../context/UserContext';

const usePostsAxios = (username) => {
    const {user, setUser} = useContext(UserContext);

    const { loading, error, value, setValue } = useAxiosWrapper(
        'get',
        {},
        `/post/byUsername/${username}?loggedInUserId=${user.id}`,
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
