const applySocketIo = (io) => {
    io.on('connection', (socket) => {
        socket.on('join-room', (userId) => {
            socket.join(userId);
            socket.emit('connected');
        });
        socket.on('leave-room', (userId) => {
            socket.leave(userId);
        })

    });
}

module.exports = applySocketIo;
