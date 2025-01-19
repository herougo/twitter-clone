import React, { useState } from 'react';
import useAxiosWrapper from '../../../../../hooks/useAxiosWrapper';

const useProfileAxios = (username) => {
    const { loading, error, value } = useAxiosWrapper(
        'get', {}, `/profile/${username}`, null, [username]
    );

    return {
        loading, error, value
    };
}

export default useProfileAxios;
