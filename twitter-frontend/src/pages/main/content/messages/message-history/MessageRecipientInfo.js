import React from 'react';
import './MessageRecipientInfo.css';

const MessageRecipientInfo = ({messageData}) => {
    if (messageData.loading) {
        return <div>Loading</div>;
    }

    if (messageData.error) {
        return <div>{messageData.error.toString()}</div>;
    }
    
    return (
        <div className='message-page-content__recipient-info'>
            <div className='message-page-content__profile-pic'>
                <img/>
            </div>
            <div className='message-page-content__name'>
                <span>{messageData.value.user.name}</span>
            </div>
            <div className='message-page-content__username'>
                <span>{messageData.value.user.username}</span>
            </div>
        </div>
    );
}

export default MessageRecipientInfo;
