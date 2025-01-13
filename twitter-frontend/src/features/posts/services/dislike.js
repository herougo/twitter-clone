import axiosWrapper from "../../../lib/axiosWrapper";


const dislike = async ({userFromId, postId}) => {
    return await axiosWrapper('post', {userFromId, postId}, '/post/dislike');
}

export default dislike;