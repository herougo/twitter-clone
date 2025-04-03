const unfollow = async ({axiosFunction, payload}) => {
    const {followerId, userId} = payload;
    return await axiosFunction('post', {followerId, userId}, '/unfollow');
}

export default unfollow;