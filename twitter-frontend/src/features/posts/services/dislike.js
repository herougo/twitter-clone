const dislike = async ({axiosFunction, payload}) => {
    const {userFromId, postId} = payload;
    return await axiosFunction('post', {userFromId, postId}, '/post/dislike');
}

export default dislike;