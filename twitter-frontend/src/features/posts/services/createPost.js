const createPost = async ({axiosFunction, payload}) => {
    const {authorId, content, replyToId} = payload;
    return await axiosFunction('post', {authorId, content, replyToId}, '/post/create');
}

export default createPost;