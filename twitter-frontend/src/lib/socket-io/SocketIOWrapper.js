import { io } from "socket.io-client";
import CONFIG from "../config";

class SocketIOWrapper {
    constructor() {
        this.connected = false;
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
        this.socket.disconnect();
        this.socket = null;
    }

    joinUserRoom(userId) {
        this.socket.emit('join-user-room', userId);
    }

    leaveUserRoom(userId) {
        this.socket.emit('leave-user-room', userId);
    }
}

export default SocketIOWrapper;
