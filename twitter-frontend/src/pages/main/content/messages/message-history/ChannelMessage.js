import React from 'react';
import './ChannelMessage.css';

const ChannelMessage = ({children, isFromYou}) => {
    let classes = 'channel-message';
    if (isFromYou) {
        classes += ' channel-message--from-you';
    }

    return (
        <div className={classes}>
            {children}
        </div>
    );
}

export default ChannelMessage;
