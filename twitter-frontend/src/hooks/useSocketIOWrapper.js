import { useEffect, useState } from 'react';
import SocketIOWrapper from '../lib/socket-io/SocketIOWrapper';

const useSocketIOWrapper = (user) => {
    const [socketWrapper, _] = useState(new SocketIOWrapper());

    useEffect(() => {
        if (!socketWrapper.socket) {
            socketWrapper.connect();
        }
        socketWrapper.maybeChangeUserRoom(user && user.id);
    }, [user]);

    return socketWrapper;
}

export default useSocketIOWrapper;
