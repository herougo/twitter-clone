const sendMessage = async ({axiosFunction, payload}) => {
    return await axiosFunction('post', payload, `/message`);
}

export default sendMessage;