import axiosWrapper from "../../../lib/axiosWrapper";


const unfollow = async ({followerId, userId}) => {
    return await axiosWrapper('post', {followerId, userId}, '/unfollow');
}

export default unfollow;