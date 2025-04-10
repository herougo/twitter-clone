import React from 'react';
import MessageChannel from './MessageChannel';

const MessageChannels = ({channelData}) => {
    if (channelData.loading) {
        return <div>Loading</div>
    }

    if (channelData.error) {
        return <div>{channelData.error}</div>
    }

    return (
        <div className='messages-page-content__channels'>
            {
                channelData.value.channels.map(
                    (channel, ix) => <MessageChannel channel={channel}/>
                )
            }
        </div>
    );
}

export default MessageChannels;
