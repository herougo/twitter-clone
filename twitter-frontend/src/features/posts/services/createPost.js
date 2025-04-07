const createPost = async ({axiosFunction, payload}) => {
    const {content, replyToId} = payload;
    return await axiosFunction('post', {content, replyToId}, '/post');
}

export default createPost;