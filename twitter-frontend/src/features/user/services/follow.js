const follow = async ({axiosFunction, userId}) => {
    return await axiosFunction('post', {}, `/user/id/${userId}/follow`);
}

export default follow;