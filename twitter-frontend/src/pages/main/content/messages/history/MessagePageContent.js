import React from 'react';
import './MessagePageContent.css';
import ChannelMessage from './ChannelMessage';

const messages = [
    {
        content: 'Hello there.',
        isFromYou: true
    },
    {
        content: 'Hi there.',
        isFromYou: false
    },
    {
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        isFromYou: true
    },
    {
        content: "Oh hai!",
        isFromYou: true
    }
]

const MessagePageContent = () => {
    return (
        <div className='message-page-content'>
            {
                messages.map(
                    message => (
                        <ChannelMessage isFromYou={message.isFromYou}>
                            {message.content}
                        </ChannelMessage>
                    )
                )
            } 
        </div>
    );
}

export default MessagePageContent;
