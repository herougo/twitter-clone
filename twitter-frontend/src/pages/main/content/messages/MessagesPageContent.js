import React from 'react';
import './MessagesPageContent.css';
import { FiPlusSquare } from 'react-icons/fi';
import MessageChannel from './MessageChannel';
import { useNavigate } from 'react-router-dom';


const MessagesPageContent = () => {
    const navigate = useNavigate();

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
            <div className='messages-page-content__channels'>
                <MessageChannel
                    channel={{id: 0}}
                />
                <MessageChannel
                    channel={{id: 1}}
                />
                <MessageChannel
                    channel={{id: 2}}
                />
            </div>
        </div>
    );
}

export default MessagesPageContent;
