import React, { useState } from 'react';
import useAxiosWrapper from '../../../../../hooks/useAxiosWrapper';

const usePostsAxios = (username) => {
    const { loading, error, value } = useAxiosWrapper(
        'get', {}, `/post/byUsername/${username}`, null, [username]
    );

    return {
        loading, error, value
    };
}

export default usePostsAxios;
