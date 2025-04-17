const applySocketIo = (io) => {
    io.on('connection', (socket) => {
        console.log(`Socket ${socket.id} connected`);
        socket.on('join-user-room', (userId) => {
            socket.join(userId);
            console.log(`Socket ${socket.id} joined room ${userId}`);
            socket.emit('connected');
        });
        socket.on('leave-user-room', (userId) => {
            socket.leave(userId);
            console.log(`Socket ${socket.id} left room ${userId}`);
        })

    });
}

module.exports = applySocketIo;
