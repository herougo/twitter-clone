import React from 'react';
import { Post } from '../../../../features/posts';
import usePostsFullFeedAxios from './hooks/usePostsFullFeedAxios';

const HomePageFeed = () => {
    const postData = usePostsFullFeedAxios();

    if (postData.loading) {
        return <div>Loading</div>;
    }

    if (postData.error) {
        return <div>{postData.error.toString()}</div>;
    }

    return (
        <div>
            {
                postData.value.map(
                    (post, ix) => (
                        <Post 
                            key={post.id}
                            post={post}
                            setPost={postData.setPostBuilder(ix)}
                            clickable={true}>
                        </Post>
                    )
                )
            }
        </div>
    );
}

export default HomePageFeed;
