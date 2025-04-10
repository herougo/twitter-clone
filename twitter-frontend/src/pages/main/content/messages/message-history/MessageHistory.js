import React, { useContext } from 'react';
import ChannelMessage from './ChannelMessage';
import './MessageHistory.css';
import humanReadableDate from '../../../../../utils/humanReadableDate';
import UserContext from '../../../../../context/UserContext';

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


const MessageHistory = ({messageData}) => {
    const {user, setUser} = useContext(UserContext);

    if (messageData.loading || messageData.error) {
        return <div className='message-page-content__messages'></div>;
    }

    const {messageDates, messageGroups} = groupMessagesByDate(messageData.value.messages);

    return (
        <div className='message-page-content__messages'>
            {
                messageGroups.map(
                    (messageGroup, ix) => (
                        <div key={messageDates[ix]}>
                            <div className='message-page-content__message-group-date'>
                                {messageDates[ix]}
                            </div>
                            <div className='message-page-content__message-group'>
                                {messageGroup.map(
                                    message => (
                                        <ChannelMessage
                                            key={message.id}
                                            isFromYou={message.authorId === user.id}>
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
    );
}

export default MessageHistory;
