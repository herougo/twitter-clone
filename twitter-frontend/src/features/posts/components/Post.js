import React from 'react';
import './Post.css';
import humanReadableDate from '../../../utils/humanReadableDate';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { USER_INTERACTION } from '../../../utils/enums';

const Post = ({post}) => {
    const { id, author, contents, numLikes, numDislikes, userInteraction, createdDate } = post;
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
                <div className='post__contents'>{replyTo.contents}</div>
            </div>
        );
    }
    const authorName = author.name;
    const authorUsername = author.username;

    const createdDateString = humanReadableDate(createdDate);
    const isLiked = userInteraction === USER_INTERACTION.like;
    const isDisliked = userInteraction === USER_INTERACTION.dislike;

    return (
        <div key={id} className='post'>
            <div className='post__left-column'>
                <div className='post__icon'></div>
            </div>
            <div className='post__right-column'>
                <div className='post__author-info-and-date'>
                    <div><span className='post__author-name'>{authorName}</span></div>
                    <div><span className='post__author-username'>@{authorUsername}</span></div>
                    <div><span className='post__created-date'>{createdDateString}</span></div>
                </div>
                <div className='post__contents'>{contents}</div>
                {replyToSection}
                <div className='post__interactions'>
                    <div className={`${isLiked? 'post__btn-div__active' : ''}`}>
                        <button className='post__btn'>
                            <AiOutlineLike/>
                        </button>
                        <span className='post__num-likes'>{numLikes || ''}</span>
                    </div>
                    <div className={`${isDisliked? 'post__btn-div__active' : ''}`}>
                        <button className='post__btn'>
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
