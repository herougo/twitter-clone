import React, { useContext } from 'react';
import './MessagesPageContent.css';
import { FiPlusSquare } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import useChannelGet from './hooks/useChannelGet';
import MessageChannels from './MessageChannels';


const MessagesPageContent = () => {
    const navigate = useNavigate();
    const channelData = useChannelGet();
    
    const newMessageOnClick = () => {
        navigate('/messages/new');
    }

    return (
        <div className='messages-page-content'>
            <div className='messages-page-content__top-bar'>
                <div className='messages-page-content__top-bar-left-column'>
                    <h2 className='messages-page-content__messages-header'>
                        Messages
                    </h2>
                </div>
                <div className='messages-page-content__top-bar-right-column'>
                    <button
                        className='btn messages-page-content__new-message-btn'
                        onClick={newMessageOnClick}>
                        <FiPlusSquare></FiPlusSquare>
                    </button>
                </div>
            </div>
            <MessageChannels channelData={channelData}></MessageChannels>
        </div>
    );
}

export default MessagesPageContent;
