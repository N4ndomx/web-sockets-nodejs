const express = require('express')
const cors = require('cors')
const { socketController } = require('../sockets/socketController')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.server = require('http').createServer(this.app)
        this.io = require('socket.io')(this.server)

        this.middlewares();

        this.routes();

        this.socketEvents();

    }

    socketEvents() {
        this.io.on('connection', socketController)
    }
    middlewares() {
        this.app.use(cors())
        this.app.use(express.static('public'))
    }
    routes() {

    }

    listen() {
        this.server.listen(this.port, () => {
            console.log("Servidor listo en el puerto :", this.port)
        })
    }
}

module.exports = Server