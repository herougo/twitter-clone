import axiosWrapper from "../../../lib/axiosWrapper";


const undislike = async ({userFromId, postId}) => {
    return await axiosWrapper('post', {userFromId, postId}, '/post/undislike');
}

export default undislike;