import React, { useContext, useState } from 'react';
import './CreateMessage.css';
import { BiSend } from 'react-icons/bi';
import GrowingTextArea from '../../../../../components/utility/GrowingTextArea';
import UserContext from '../../../../../context/UserContext';
import sendMessage from './services/sendMessage';
import useAxiosWrapper from '../../../../../hooks/useAxiosWrapper';

const CreateMessage = ({channelId, onSendMessageSuccess}) => {
    const {user, setUser} = useContext(UserContext);
    const [content, setContent] = useState('');
    const {axiosWithHeader} = useAxiosWrapper();

    const sendMessageAndHandle = async () => {
        const response = await sendMessage({
            axiosFunction: axiosWithHeader,
            payload: {content, channelId}
        });
        const message = {
            content,
            authorId: user.id,
            createdAt: response.data.createdAt,
            id: response.data.id
        };
        onSendMessageSuccess(message);
        setContent('');
    };

    const maxHeightFn = (window) => {
         // 40% of window minus 20px for the CreateMessage padding and minus
         // 10px for the main-content margin
        return 0.4 * window.height - 30;
    }

    return (
        <div className='create-message'>
            <div className='create-message__left-column'>
                <div className='create-message__content'>
                    <GrowingTextArea
                        maxHeightFn={maxHeightFn}
                        content={content}
                        setContent={setContent}
                        
                        className='create-message__textarea'
                        spellcheck="false"
                        maxLength="1000"
                        placeholder="Create your message"
                    >
                        
                    </GrowingTextArea>
                </div>
            </div>
            <div className='create-message__right-column'>
                <div className='create-message__buttons'>
                    <button
                        className='btn create-message__send-btn'
                        onClick={sendMessageAndHandle}
                        disabled={content.trim() === ''}
                    >
                        <BiSend></BiSend>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateMessage;
