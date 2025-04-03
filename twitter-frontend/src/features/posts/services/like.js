const like = async ({axiosFunction, payload}) => {
    const {userFromId, postId} = payload;
    return await axiosFunction('post', {userFromId, postId}, '/post/like');
}

export default like;