import React from 'react';
import './MessageRecipientInfo.css';

const MessageRecipientInfo = () => {
    const data = {
        value: {
            name: 'Username Password',
            username: 'username'
        }
    }

    return (
        <div className='message-page-content__recipient-info'>
            <div className='message-page-content__profile-pic'>
                <img/>
            </div>
            <div className='message-page-content__name'>
                <span>{data.value.name}</span>
            </div>
            <div className='message-page-content__username'>
                <span>{data.value.username}</span>
            </div>
        </div>
    );
}

export default MessageRecipientInfo;
