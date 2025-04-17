import React, { useContext, useEffect, useRef, useState } from 'react';
import './MessagePageContent.css';
import CreateMessage from './CreateMessage';
import MessageRecipientInfo from './MessageRecipientInfo';
import { useParams } from 'react-router-dom';
import useGetMessages from './hooks/useGetMessages';
import MessageHistory from './MessageHistory';
import SocketIOContext from '../../../../../context/SocketIOContext';


const MessagePageContent = () => {
    const params = useParams();
    const channelId = params.id;
    const messageContentRef = useRef(null);
    const [scrollDownNeeded, setScrollDownNeeded] = useState(true);
    const messageData = useGetMessages(channelId);
    const socketWrapper = useContext(SocketIOContext);

    const onSendMessageSuccess = (message) => {
        messageData.addMessage(message);
        setScrollDownNeeded(true);
        socketWrapper.emitNewMessage(message, messageData.value.user.id);
    }

    useEffect(() => {
        // scroll down whenever the message history changes
        if (messageContentRef.current && !messageData.loading && scrollDownNeeded) {
            messageContentRef.current.scrollTop = messageContentRef.current.scrollHeight;
            setScrollDownNeeded(false);
        }
    }, [scrollDownNeeded, messageData]);

    return (
        <div className='message-page-content'>
            <div className='message-page-content__content' ref={messageContentRef}>
                <MessageRecipientInfo messageData={messageData}/>
                <MessageHistory messageData={messageData} />
            </div>
            <div className='message-page-content__create'>
                <CreateMessage
                    channelId={channelId}
                    onSendMessageSuccess={onSendMessageSuccess}
                />
            </div>
        </div>
    );
}

export default MessagePageContent;
