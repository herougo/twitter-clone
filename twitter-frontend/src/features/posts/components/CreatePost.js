import React, { useState } from 'react';
import './CreatePost.css';

const CreatePost = () => {
    const [content, setContent] = useState('');

    return (
        <div className='create-post'>
            <div className='create-post__left-column'>
                <div className='create-post__profile-pic'>

                </div>
            </div>
            <div className='create-post__middle-column'>
                <div
                    className='create-post__content'
                    contentEditable="true"
                    onChange={(e) => setContent(e.target.value)}
                >
                </div>
            </div>
            <div className='create-post__right-column'>
                <div className='create-post__buttons'>
                    <button className='btn create-post__submit-btn'>
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;
