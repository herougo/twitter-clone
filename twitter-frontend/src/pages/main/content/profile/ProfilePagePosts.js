import React from 'react';
import Post from '../../../../features/posts/components/Post';

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
                    post => <Post key={post.id} post={post}></Post>
                )
            }
        </div>
    );
}

export default ProfilePagePosts;
