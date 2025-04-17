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

    const receiveRealtimeMessage = (message) => {
        const channelId = message.channelId;

        const index = value.channels.findIndex(channel => channel.id === channelId);
        if (index === -1) {
            throw new Error(`Received real-time message for a missing channel (${channelId})!`);
        }

        const newChannels = JSON.parse(JSON.stringify(value.channels));
        const relevantChannel = newChannels[index];
        newChannels.splice(index, 1);
        newChannels.unshift(relevantChannel);

        relevantChannel.lastMessageContent = message.content;
        relevantChannel.lastMessageSentAt = message.createdAt;

        setValue({channels: newChannels});
    };

    return {
        loading, error, value, receiveRealtimeMessage
    };
}

export default useChannelGet;
