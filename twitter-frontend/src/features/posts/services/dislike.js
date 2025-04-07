const dislike = async ({axiosFunction, postId}) => {
    return await axiosFunction('post', {}, `/post/${postId}/dislike`);
}

export default dislike;