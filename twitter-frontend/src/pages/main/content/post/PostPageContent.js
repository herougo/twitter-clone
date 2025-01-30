import React from 'react';
import './PostPageContent.css';
import { useParams } from 'react-router-dom';
import { CreatePost, Post } from '../../../../features/posts';
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

    console.log(postData.value.replies);

    return (
        <div>
            <div>
                <Post post={postData.value.post} setPost={postData.setPost}></Post>
            </div>
            <div>
                Replies
            </div>
            <div>
                <CreatePost replyToId={postId}></CreatePost>
            </div>
            <div>
                {
                    postData.value.replies.map(
                        (reply, ix) => (
                            <Post
                                key={reply.id}
                                post={reply}
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
