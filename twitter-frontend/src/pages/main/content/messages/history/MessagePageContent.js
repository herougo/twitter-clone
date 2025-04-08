import React, { useState } from 'react';
import './MessagePageContent.css';
import ChannelMessage from './ChannelMessage';
import CreateMessage from './CreateMessage';

const messagesData = [
    {
        id: 0,
        content: 'Hello there.',
        isFromYou: true
    },
    {
        id: 1,
        content: 'Hi there.',
        isFromYou: false
    },
    {
        id: 2,
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        isFromYou: true
    },
    {
        id: 3,
        content: "Oh hai!",
        isFromYou: true
    }
]

const MessagePageContent = () => {
    const [messages, setMessages] = useState(messagesData);

    const onSendMessageSuccess = (message) => {
        setMessages([...messages, {
            id: messages.length,
            isFromYou: true,
            content: message.content
        }]);
    }

    return (
        <div className='message-page-content'>
            <div className='message-page-content__messages'>
                {
                    messages.map(
                        message => (
                            <ChannelMessage
                                key={message.id}
                                isFromYou={message.isFromYou}>
                                {message.content}
                            </ChannelMessage>
                        )
                    )
                }
            </div>
            <div className='message-page-content__create'>
                <CreateMessage onSendMessageSuccess={onSendMessageSuccess}/>
            </div>
        </div>
    );
}

export default MessagePageContent;
