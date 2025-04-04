import useAsyncAxiosWrapper from '../../../../../hooks/useAsyncAxiosWrapper';

const useProfileAxios = (username) => {
    const { loading, error, value, setValue } = useAsyncAxiosWrapper(
        'get', {}, `/user/name/${username}/profile/`, null, [username]
    );

    return {
        loading, error, value, setValue
    };
}

export default useProfileAxios;
