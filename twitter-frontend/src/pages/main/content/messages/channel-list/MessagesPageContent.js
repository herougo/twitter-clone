import React from 'react';
import './MessagesPageContent.css';
import { FiPlusSquare } from 'react-icons/fi';
import MessageChannel from './MessageChannel';
import { useNavigate } from 'react-router-dom';

const channelData = [
    {
        id: 0,
        username: 'username',
        name: 'Username Password',
        lastMessage: 'Hi there you awesome person!'
    },
    {
        id: 1,
        username: 'u',
        name: 'U P',
        lastMessage: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    }
];


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
                {
                    channelData.map(
                        channel => <MessageChannel channel={channel}/>
                    )
                }
            </div>
        </div>
    );
}

export default MessagesPageContent;
