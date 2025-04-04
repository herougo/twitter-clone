const unfollow = async ({axiosFunction, userId}) => {
    return await axiosFunction('delete', {}, `/user/id/${userId}/follow`);
}

export default unfollow;