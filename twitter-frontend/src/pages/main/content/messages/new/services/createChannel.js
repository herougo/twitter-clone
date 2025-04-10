const createChannel = async ({axiosFunction, userIds}) => {
    return await axiosFunction('post', {
        userIds
    }, '/channel');
}

export default createChannel;
