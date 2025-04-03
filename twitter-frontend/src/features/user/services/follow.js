const follow = async ({axiosFunction, payload}) => {
    const {followerId, userId} = payload;
    return await axiosFunction('post', {followerId, userId}, '/follow');
}

export default follow;