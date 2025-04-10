import React, { useEffect, useRef, useState } from 'react';
import './MessagePageContent.css';
import ChannelMessage from './ChannelMessage';
import CreateMessage from './CreateMessage';
import MessageRecipientInfo from './MessageRecipientInfo';
import humanReadableDate from '../../../../../utils/humanReadableDate';
import { useParams } from 'react-router-dom';

const messagesData = [
    {
        id: 0,
        content: 'Hello there.',
        createdAt: '2025-04-05T21:12:32.069+00:00',
        isFromYou: true
    },
    {
        id: 1,
        content: 'Hi there.',
        createdAt: '2025-04-05T21:12:32.069+00:00',
        isFromYou: false
    },
    {
        id: 2,
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        createdAt: '2025-04-06T21:12:32.069+00:00',
        isFromYou: true
    },
    {
        id: 3,
        content: "Oh hai!",
        createdAt: '2025-04-07T21:12:32.069+00:00',
        isFromYou: true
    }
];

const groupMessagesByDate = (messages) => {
    const messageDates = [];
    const messageGroups = [];

    let prevDate = null;
    let currentDate = null;
    for (let message of messages) {
        currentDate = humanReadableDate(message.createdAt);
        if (currentDate !== prevDate) {
            prevDate = currentDate;
            messageDates.push(currentDate);
            messageGroups.push([]);
        }
        messageGroups[messageGroups.length - 1].push(message);
    }

    return {
        messageDates, messageGroups
    };
};

const MessagePageContent = () => {
    const params = useParams();
    const channelId = params.id;
    const [messages, setMessages] = useState(messagesData);
    const messageContentRef = useRef(null);
    const [scrollDownNeeded, setScrollDownNeeded] = useState(false);

    const onSendMessageSuccess = (message) => {
        setMessages([...messages, {
            id: messages.length,
            isFromYou: true,
            createdAt: '2025-04-07T21:12:32.069+00:00',
            content: message.content
        }]);
        setScrollDownNeeded(true);
    }

    useEffect(() => {
        // scroll down whenever the message history changes
        if (messageContentRef.current && scrollDownNeeded) {
            messageContentRef.current.scrollTop = messageContentRef.current.scrollHeight;
            setScrollDownNeeded(false);
        }
    }, [scrollDownNeeded]);

    const {messageDates, messageGroups} = groupMessagesByDate(messages);

    return (
        <div className='message-page-content'>
            <div className='message-page-content__content' ref={messageContentRef}>
                <MessageRecipientInfo />
                <div className='message-page-content__messages'>
                    {
                        messageGroups.map(
                            (messageGroup, ix) => (
                                <div>
                                    <div className='message-page-content__message-group-date'>
                                        {messageDates[ix]}
                                    </div>
                                    <div className='message-page-content__message-group'>
                                        {messageGroup.map(
                                            message => (
                                                <ChannelMessage
                                                    key={message.id}
                                                    isFromYou={message.isFromYou}>
                                                    {message.content}
                                                </ChannelMessage>
                                            )
                                        )}
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
            <div className='message-page-content__create'>
                <CreateMessage onSendMessageSuccess={onSendMessageSuccess}/>
            </div>
        </div>
    );
}

export default MessagePageContent;
