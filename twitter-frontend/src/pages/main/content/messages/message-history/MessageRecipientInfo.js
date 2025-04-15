import React from 'react';
import './MessageRecipientInfo.css';
import ProfilePicImg from '../../../../../components/utility/ProfilePicImg';

const MessageRecipientInfo = ({messageData}) => {
    if (messageData.loading) {
        return <div>Loading</div>;
    }

    if (messageData.error) {
        return <div>{messageData.error.toString()}</div>;
    }
    
    return (
        <div className='message-page-content__recipient-info'>
            <div className='message-page-content__profile-pic circular-pic'>
                <ProfilePicImg path={messageData.value.user.profilePicPath} />
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
