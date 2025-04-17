import React, { useContext, useEffect } from 'react';
import MessageChannel from './MessageChannel';
import SocketIOContext from '../../../../../context/SocketIOContext';

const MessageChannels = ({channelData}) => {
    const socketWrapper = useContext(SocketIOContext);

    useEffect(() => {
        if (socketWrapper && channelData.value) {
            socketWrapper.addOnReceiveMessageListener(channelData.receiveRealtimeMessage);
            return () => socketWrapper.removeOnReceiveMessageListener();
        }
    }, [socketWrapper, channelData.loading]);

    if (channelData.loading) {
        return <div>Loading</div>
    }

    if (channelData.error) {
        return <div>{channelData.error.toString()}</div>
    }

    return (
        <div className='messages-page-content__channels'>
            {
                channelData.value.channels.map(
                    (channel, ix) => <MessageChannel key={channel.id} channel={channel}/>
                )
            }
        </div>
    );
}

export default MessageChannels;
