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
                        onClick={sendMessage}
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
