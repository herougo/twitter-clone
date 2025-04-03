const undislike = async ({axiosFunction, payload}) => {
    const {userFromId, postId} = payload;
    return await axiosFunction('post', {userFromId, postId}, '/post/undislike');
}

export default undislike;