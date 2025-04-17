// Adapted from https://socket.io/docs/v4/server-api/#serverattachhttpserver-options
const http = require("http");
const { Server } = require("socket.io");
const applySocketIo = require("./io");

const createServer = (app, diContainer) => {
    const httpServer = http.createServer(app);
    const io = new Server();

    io.attach(httpServer);

    applySocketIo(io);
    
    return httpServer;
}

module.exports = createServer;
