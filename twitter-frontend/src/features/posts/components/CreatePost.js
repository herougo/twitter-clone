import React, { useContext, useState } from 'react';
import './CreatePost.css';
import createPost from '../services/createPost';
import UserContext from '../../../context/UserContext';
import useAxiosWrapper from '../../../hooks/useAxiosWrapper';
import ProfilePicImg from '../../../components/utility/ProfilePicImg';

const CreatePost = ({replyToId, onPostSuccess}) => {
    const [content, setContent] = useState('');
    const {axiosWithHeader} = useAxiosWrapper();
    const {user} = useContext(UserContext);

    const submitPost = async () => {
        const response = await createPost({
            axiosFunction: axiosWithHeader,
            payload: {
                content,
                replyToId: replyToId || null
            }
        });
        const newPost = response.data;
        setContent('');
        if (onPostSuccess) {
            onPostSuccess(newPost);
        }
    };

    return (
        <div className='create-post'>
            <div className='create-post__left-column'>
                <div className='create-post__profile-pic circular-pic'>
                    <ProfilePicImg path={user.profilePicPath} />
                </div>
            </div>
            <div className='create-post__middle-column'>
                <div className='create-post__content'>
                    <textarea 
                        className='create-post__textarea'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        spellcheck="false"
                        maxLength="300"
                    >
                        
                    </textarea>
                </div>
            </div>
            <div className='create-post__right-column'>
                <div className='create-post__buttons'>
                    <button
                        className='btn create-post__submit-btn'
                        onClick={submitPost}
                        disabled={content.trim() === ''}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;
