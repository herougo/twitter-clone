import React from 'react';
import './Post.css';
import humanReadableDate from '../../../utils/humanReadableDate';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { USER_INTERACTION } from '../../../utils/enums';
import useUserInteractionAxios from '../hooks/useUserInteractionAxios';

const Post = ({post, setPost}) => {
    const { id, author, content, numLikes, numDislikes, userInteraction, createdDate } = post;
    const authorName = author.name;
    const authorUsername = author.username;

    const createdDateString = humanReadableDate(createdDate);
    const isLiked = userInteraction === USER_INTERACTION.like;
    const isDisliked = userInteraction === USER_INTERACTION.dislike;

    const {onLikeClicked, onDislikeClicked} = useUserInteractionAxios({post, setPost});
    
    let replyToSection = null;
    if (post.replyTo) {
        const replyTo = post.replyTo;
        const replyToDateString = humanReadableDate(replyTo.createdDate);
        replyToSection = (
            <div className='post__reply-to'>
                <div className='post__author-info-and-date'>
                    <div><span className='post__author-name'>{replyTo.author.name}</span></div>
                    <div><span className='post__author-username'>@{replyTo.author.username}</span></div>
                    <div><span className='post__created-date'>{replyToDateString}</span></div>
                </div>
                <div className='post__contents'>{replyTo.content}</div>
            </div>
        );
    }

    return (
        <div className='post'>
            <div className='post__left-column'>
                <div>
                    <a href={`/profile/${authorUsername}`}>
                        <div className='post__icon'></div>
                    </a>
                </div>
            </div>
            <div className='post__right-column'>
                <div className='post__author-info-and-date'>
                    <div>
                        <a href={`/profile/${authorUsername}`} className='post__author-name underline-on-hover'>
                            <span>{authorName}</span>
                        </a>
                    </div>
                    <div>
                        <a href={`/profile/${authorUsername}`} className='post__author-username'>
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
