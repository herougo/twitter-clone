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
            <div className='message-channel__left-column'>
                <div className='message-channel__profile-pic'>
                    <img/>
                </div>
            </div>
            <div className='message-channel__right-column'>
                <div className='message-channel__right-column-top'>
                    <div className='message-channel__name'>
                        <span>{channel.name}</span>
                    </div>
                    <div className='message-channel__username'>
                        <span>@{channel.username}</span>
                    </div>
                </div>
                <div className='message-channel__last-message'>
                    <span>{channel.lastMessageContent}</span>
                </div>
            </div>
        </div>
    );
}

export default MessageChannel;
