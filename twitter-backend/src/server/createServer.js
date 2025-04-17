// Adapted from https://socket.io/docs/v4/server-api/#serverattachhttpserver-options
const http = require("http");
const { Server } = require("socket.io");
const applySocketIo = require("./io");
const CONFIG = require("../config");

const createServer = (app, diContainer) => {
    const httpServer = http.createServer(app);
    const io = new Server({
        cors: {
            origin: CONFIG.clientUrl,
            methods: ["GET", "POST"]
        }
    });

    io.attach(httpServer);

    applySocketIo(io);
    
    return httpServer;
}

module.exports = createServer;
