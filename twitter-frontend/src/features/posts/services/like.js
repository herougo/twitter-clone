import axiosWrapper from "../../../lib/axiosWrapper";


const like = async ({userFromId, postId}) => {
    return await axiosWrapper('post', {userFromId, postId}, '/post/like');
}

export default like;