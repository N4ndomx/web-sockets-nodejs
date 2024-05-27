const socketController = (socket) => {

    console.log('⏰ Cliente conectado', socket.handshake.headers['sec-ch-ua'])
    // desconexion de clientes
    socket.on('disconnect', () => {
        console.log('🤨 Cliente desconectado...', socket.id)

    });
    // cliente encia un mensaje 
    socket.on('enviar-mensaje', (payload, callback) => {
        console.log('💻 ->', payload)
        const id = 1234;

        callback(id)
        // implementar un broadcast
        socket.broadcast.emit('res-ser', payload)
    });


    socket.on('eliminar-mensaje', (id) => {

        socket.broadcast.emit('mensaje-eliminado', id)
        socket.emit('mensaje-eliminado', id)
    })

}

module.exports = {
    socketController
}