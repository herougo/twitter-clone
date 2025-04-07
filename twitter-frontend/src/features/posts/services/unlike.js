const unlike = async ({axiosFunction, postId}) => {
    return await axiosFunction('delete', {}, `/post/${postId}/unlike`);
}

export default unlike;