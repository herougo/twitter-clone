import { useContext } from 'react';
import useAsyncAxiosWrapper from '../../../../../../hooks/useAsyncAxiosWrapper'
import UserContext from '../../../../../../context/UserContext';

const useGetMessages = (channelId) => {
    const {user, setUser} = useContext(UserContext);

    const { loading, error, value, setValue } = useAsyncAxiosWrapper(
        'get',
        {},
        `/channel/${channelId}/messages`,
        null,
        [user]
    );

    const addMessage = (message) => {
        const newValue = JSON.parse(JSON.stringify(value));
        newValue.messages.push(message);
        setValue(newValue);
    };

    return {
        loading, error, value, addMessage
    };
}

export default useGetMessages;
