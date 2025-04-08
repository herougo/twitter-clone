import React, { useState } from 'react';
import './CreateMessage.css';
import { BiSend } from 'react-icons/bi';
import GrowingTextArea from '../../../../../components/utility/GrowingTextArea';

const CreateMessage = ({onSendMessageSuccess}) => {
    const [content, setContent] = useState('');

    const sendMessage = async () => {
        onSendMessageSuccess({content: content});
        setContent('');
    };

    return (
        <div className='create-message'>
            <div className='create-message__left-column'>
                <div className='create-message__content'>
                    <GrowingTextArea
                        className='create-message__textarea'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
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
                        onClick={sendMessage}
                    >
                        <BiSend></BiSend>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateMessage;
