import React from 'react';
import './Post.css';
import humanReadableDate from '../../../utils/humanReadableDate';

const Post = ({post}) => {
    const { id, author, contents, numLikes, numDislikes, createdDate } = post;
    if (post.replyTo) {
        // ?????
    }
    const authorName = author.name;
    const authorUsername = author.username;

    const createdDateString = humanReadableDate(createdDate);

    return (
        <div key={id} className='post'>
            <div className='post__left-column'>
                <div className='post__icon'></div>
            </div>
            <div className='post__right-column'>
                <div>
                    <span className='post__author-name'>{authorName}</span>
                    <span className='post__author-username'>@{authorUsername}</span>
                    <span className='post__created-date'>{createdDateString}</span>
                </div>
                <div className='post__contents'>{contents}</div>
                <div className='post__interactions'>

                </div>
            </div>
        </div>
    );
}

export default Post;
