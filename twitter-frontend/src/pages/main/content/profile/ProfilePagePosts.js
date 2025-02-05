import React from 'react';
import { Post } from '../../../../features/posts';

const ProfilePagePosts = ({postsData}) => {
    if (postsData.loading) {
        return <div>Loading</div>;
    }

    if (postsData.error) {
        return <div>{postsData.error.toString()}</div>;
    }

    return (
        <div className='profile-page-content__posts'>
            {
                postsData.value.map(
                    (post, ix) => <Post key={post.id} post={post} setPost={postsData.setPostBuilder(ix)} clickable={true}></Post>
                )
            }
        </div>
    );
}

export default ProfilePagePosts;
