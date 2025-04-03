const unlike = async ({axiosFunction, payload}) => {
    const {userFromId, postId} = payload;
    return await axiosFunction('post', {userFromId, postId}, '/post/unlike');
}

export default unlike;