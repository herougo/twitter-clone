import axiosWrapper from "../../../lib/axiosWrapper";


const follow = async ({followerId, userId}) => {
    return await axiosWrapper('post', {followerId, userId}, '/follow');
}

export default follow;