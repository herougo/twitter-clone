import React from 'react';
import './MessageChannel.css';
import { useNavigate } from 'react-router-dom';

const MessageChannel = (props) => {
    const channel = props.channel;

    const navigate = useNavigate();

    const onClick = () => {
        navigate(`/messages/${channel.id}`);
    }

    return (
        <div className='message-channel'
            onClick={onClick}
        >
            Channel {channel.id}
        </div>
    );
}

export default MessageChannel;
