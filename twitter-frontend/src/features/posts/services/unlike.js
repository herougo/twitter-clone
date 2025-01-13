import axiosWrapper from "../../../lib/axiosWrapper";


const unlike = async ({userFromId, postId}) => {
    return await axiosWrapper('post', {userFromId, postId}, '/post/unlike');
}

export default unlike;