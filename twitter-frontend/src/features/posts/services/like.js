const like = async ({axiosFunction, postId}) => {
    return await axiosFunction('post', {}, `/post/${postId}/like`);
}

export default like;