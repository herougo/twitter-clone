import { useContext } from 'react';
import useAxiosWrapper from '../../../../../hooks/useAxiosWrapper';
import UserContext from '../../../../../context/UserContext';

const usePostAxios = (postId) => {
    const {user} = useContext(UserContext);

    const { loading, error, value, setValue } = useAxiosWrapper(
        'get',
        {},
        `/post/${postId}?loggedInUserId=${user.id}`,
        null,
        [postId, user]
    );

    const setPost = (post) => {
        const newValue = JSON.parse(JSON.stringify(value));
        newValue.post = post;
        setValue(newValue);
    }

    const setReplyBuilder = (ix) => {
        return (reply) => {
            const newValue = JSON.parse(JSON.stringify(value));
            newValue.replies[ix] = reply;
            setValue(newValue);
        };
    }

    const pushReply = (reply) => {
        const newValue = JSON.parse(JSON.stringify(value));
        newValue.replies.unshift(reply);
        setValue(newValue);
    }

    return {
        loading, error, value, setPost, setReplyBuilder, pushReply
    };
}

export default usePostAxios;
