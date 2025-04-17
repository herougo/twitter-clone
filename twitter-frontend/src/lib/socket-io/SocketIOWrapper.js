import { io } from "socket.io-client";
import CONFIG from "../config";

class SocketIOWrapper {
    constructor() {
        this.connected = false;
        this.userRoom = null;
        this.socket = null;
    }

    connect() {
        this.socket = io(CONFIG.backendBaseURL);
        this.setupSocket(this.socket);
    }

    setupSocket(socket) {
        socket.on('connected', () => {
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
            this._leaveUserRoom(userId);
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
}

export default SocketIOWrapper;
