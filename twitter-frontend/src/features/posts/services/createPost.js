import axiosWrapper from "../../../lib/axiosWrapper";


const createPost = async ({authorId, content, replyToId}) => {
    return await axiosWrapper('post', {authorId, content, replyToId}, '/post/create');
}

export default createPost;