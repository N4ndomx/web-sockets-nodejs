
// console.log('hola?')

const socketCliente = io()

const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')
const txtMensaje = document.querySelector('#txtMensaje')
const btnEnviar = document.querySelector('#btnEnviar')
let socket_id = ''

socketCliente.on('connect', (socket) => {
    socket_id = socketCliente.id
    console.log('conectado... :)')
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';

})

socketCliente.on('disconnect', () => {
    console.log('Desconectado....')
    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
})

socketCliente.on('res-ser', (res) => {
    agregarMensajeATabla(res)
    console.log(":: Servidor respondio.. ", res)
})
socketCliente.on('mensaje-eliminado', (id) => {
    eliminarMensajeDeTabla(id)
    console.log(`Mensaje con ID ${id} fue eliminado`)
});

btnEnviar.addEventListener('click', () => {
    const msg = txtMensaje.value

    const payload = {
        id: generarID(),
        cliente: socket_id,
        data: msg,
        fecha: new Date().toLocaleDateString(),
        hora: new Date().toLocaleTimeString()
    }
    console.log(payload)
    agregarMensajeATabla(payload)

    socketCliente.emit('enviar-mensaje', payload, (id) => {
        console.log(":: Callback Server : ", id)
    })
})
function agregarMensajeATabla(payload) {
    const nuevaFila = document.createElement('tr')
    nuevaFila.id = payload.id

    const celdaCliente = document.createElement('td')
    celdaCliente.textContent = payload.cliente

    nuevaFila.appendChild(celdaCliente)

    const celdaFechaHora = document.createElement('td')
    celdaFechaHora.textContent = `${payload.fecha} ${payload.hora}`
    nuevaFila.appendChild(celdaFechaHora)

    const celdaMensaje = document.createElement('td')
    celdaMensaje.textContent = payload.data
    nuevaFila.appendChild(celdaMensaje)

    const celdaEliminar = document.createElement('td')
    const btnEliminar = document.createElement('button')

    btnEliminar.textContent = 'Eliminar'
    btnEliminar.type = 'button'

    btnEliminar.className = 'btn btn-danger'
    btnEliminar.onclick = () => {
        socketCliente.emit('eliminar-mensaje', payload.id)
    }
    celdaEliminar.appendChild(btnEliminar)
    nuevaFila.appendChild(celdaEliminar)

    tablaMensajes.appendChild(nuevaFila)
}

function generarID() {
    return '_' + Math.random().toString(36).slice(1, 9)
}

function eliminarMensajeDeTabla(id) {
    const fila = document.getElementById(id)
    if (fila) {
        fila.remove()
    }
}