import React from 'react';
import './PostPageContent.css';
import { useParams } from 'react-router-dom';
import { Post } from '../../../../features/posts';
import usePostAxios from './hooks/usePostAxios';

const PostPageContent = () => {
    const postId = useParams().id;
    const postData = usePostAxios(postId);

    if (postData.loading) {
        return <div>Loading</div>;
    }

    if (postData.error) {
        return <div>{postData.error.toString()}</div>;
    }

    return (
        <div>
            <div>
                <Post post={postData.value.post} setPost={postData.setPost}></Post>
            </div>
            <div>
                Replies
            </div>
            <div>
                {
                    postData.value.replies.map(
                        (post, ix) => (
                            <Post
                                key={post.id}
                                post={post}
                                setPost={postData.setReplyBuilder(ix)}
                            >
                            </Post>
                        )
                    )
                }
            </div>
        </div>
    );
}

export default PostPageContent;
