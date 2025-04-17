import { io } from "socket.io-client";
import CONFIG from "../config";

class SocketIOWrapper {
    constructor() {
        this.connected = false;
        this.userRoom = null;
        this.socket = null;
        this.onReceiveMessageListener = null;
    }

    connect() {
        this.socket = io(CONFIG.backendBaseURL);
        this.setupSocket(this.socket);
    }

    setupSocket(socket) {
        socket.on('connect', () => {
            console.log('connected');
            this.connected = true;
        });
    }

    disconnect() {
        this.connected = false;
        this.socket.disconnect();
        this.socket = null;
    }

    maybeChangeUserRoom(userId) {
        if (this.userRoom && userId) {
            if (this.userRoom !== userId) {
                throw new Error("How did the userRoom differ from the new userId?");
            }
        } else if (this.userRoom && !userId) {
            this._leaveUserRoom(this.userRoom);
            this.userRoom = null;
        } else if (!this.userRoom && userId) {
            this._joinUserRoom(userId);
            this.userRoom = userId;
        } else {
            // do nothing!
        }
    }

    _joinUserRoom(userId) {
        this.socket.emit('join-user-room', userId);
    }

    _leaveUserRoom(userId) {
        this.socket.emit('leave-user-room', userId);
    }

    emitNewMessage(message, receiver) {
        this.socket.emit('new-message', message, receiver);
    }

    addOnReceiveMessageListener(addMessage) {
        console.log('addOnReceiveMessageListener');
        if (this.onReceiveMessageListener) {
            throw new Error("why are there 2 onReceiveMessage listeners?");
        }
        this.onReceiveMessageListener = (message) => {
            addMessage(message);
        };
        this.socket.on('receive-message', this.onReceiveMessageListener);
    }

    removeOnReceiveMessageListener() {
        console.log('removeOnReceiveMessageListener');
        this.socket.off('receive-message', this.onReceiveMessageListener);
        this.onReceiveMessageListener = null;
    }
}

export default SocketIOWrapper;
