const io = require('socket.io')

let socketServer

function initSocket(server) {
    socketServer = new io.Server(server)

    socketServer.on('connection', socket => {

        socket.on('enterSocket', (data) => {
            socket.join(data.userId)
            emitEvent(data.userId, "socketEntered", {isSuccess: true})
        })
        socket.on('leaveSocket', (data) => {
            socket.leave(data.userId)
        })
    })
}

function emitEvent(userId, eventName, data) {
    socketServer.to(userId).emit(eventName, data)
}

module.exports = {
    initSocket, emitEvent
}
