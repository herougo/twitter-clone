const undislike = async ({axiosFunction, postId}) => {
    return await axiosFunction('delete', {}, `/post/${postId}/dislike`);
}

export default undislike;