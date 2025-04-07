const unlike = async ({axiosFunction, postId}) => {
    return await axiosFunction('delete', {}, `/post/${postId}/like`);
}

export default unlike;