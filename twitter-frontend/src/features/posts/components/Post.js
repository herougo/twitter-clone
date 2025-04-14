import React from 'react';
import './Post.css';
import humanReadableDate from '../../../utils/humanReadableDate';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { USER_INTERACTION } from '../../../utils/enums';
import useUserInteractionAxios from '../hooks/useUserInteractionAxios';
import { useNavigate } from 'react-router-dom';
import CONFIG from '../../../lib/config';

const Post = ({post, setPost, clickable}) => {
    const { id, author, content, numLikes, numDislikes, userInteraction, createdDate } = post;
    const authorName = author.name;
    const authorUsername = author.username;

    const createdDateString = humanReadableDate(createdDate);
    const isLiked = userInteraction === USER_INTERACTION.like;
    const isDisliked = userInteraction === USER_INTERACTION.dislike;

    const {onLikeClicked, onDislikeClicked} = useUserInteractionAxios({post, setPost});
    const navigate = useNavigate();
    
    let replyToSection = null;
    const replyTo = post.replyTo;
    if (replyTo) {
        const replyToDateString = humanReadableDate(replyTo.createdDate);
        const replyToOnClick = (e) => {
            e.stopPropagation();
            navigate(`/post/${replyTo.id}`);
        };
        replyToSection = (
            <div className='post__reply-to clickable' onClick={replyToOnClick}>
                <div className='post__author-info-and-date'>
                    <div>
                        <a 
                            href={`/profile/${replyTo.author.username}`}
                            className='post__author-name underline-on-hover'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <span className='post__author-name'>{replyTo.author.name}</span>
                        </a>
                    </div>
                    <div>
                        <a
                            href={`/profile/${replyTo.author.username}`}
                            className='post__author-username'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <span className='post__author-username'>@{replyTo.author.username}</span>
                        </a>
                    </div>
                    <div><span className='post__created-date'>{replyToDateString}</span></div>
                </div>
                <div className='post__contents'>{replyTo.content}</div>
            </div>
        );
    }

    let postOnClick = null;
    let postClasses = 'post';
    if (clickable) {
        postClasses = `${postClasses} clickable`;
        postOnClick = () => navigate(`/post/${id}`);
    }

    return (
        <div className={postClasses} onClick={postOnClick}>
            <div className='post__left-column'>
                <div>
                    <a href={`/profile/${authorUsername}`} onClick={(e) => e.stopPropagation()}>
                        <div className='post__icon circular-pic'>
                            <img src={`${CONFIG.backendBaseURL}/uploads/avatars/${author.id}.jpg`}></img>
                        </div>
                    </a>
                </div>
            </div>
            <div className='post__right-column'>
                <div className='post__author-info-and-date'>
                    <div>
                        <a
                            href={`/profile/${authorUsername}`}
                            className='post__author-name underline-on-hover'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <span>{authorName}</span>
                        </a>
                    </div>
                    <div>
                        <a
                            href={`/profile/${authorUsername}`}
                            className='post__author-username'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <span>@{authorUsername}</span>
                        </a>
                    </div>
                    <div><span className='post__created-date'>{createdDateString}</span></div>
                </div>
                <div className='post__contents'>{content}</div>
                {replyToSection}
                <div className='post__interactions'>
                    <div className={`${isLiked? 'post__btn-div__active' : ''}`}>
                        <button className='post__btn' onClick={onLikeClicked}>
                            <AiOutlineLike/>
                        </button>
                        <span className='post__num-likes'>{numLikes || ''}</span>
                    </div>
                    <div className={`${isDisliked? 'post__btn-div__active' : ''}`}>
                        <button className='post__btn' onClick={onDislikeClicked}>
                            <AiOutlineDislike/>
                        </button>
                        <span className='post__num-dislikes'>{numDislikes || ''}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
