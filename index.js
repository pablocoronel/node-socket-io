const path = require('path'); // Manejar paths independientemente del SO
const express = require('express');
const app = express();
const socketIO = require('socket.io');

// Settings
app.set('port', process.env.PORT || 3000);

// Static files
app.use(express.static(path.join(__dirname, 'public'))); // Cargar los archivos estaticos en la app

// Start the server
const server = app.listen(app.get('port'), () => {
	console.log('Server on port', app.get('port'));
});

// Config de socket io
const io = socketIO(server);

//Websockets
// Al conectarse
io.on('connection', (socket) => {
	// es la conexion desde chat.js
	console.log('una conexion nueva', socket.id);

	// Esuchar eventos
	// Escuchar, al recibir un mensaje
	socket.on('chat:message', (data) => {
		// Todas las conexiones
		io.sockets.emit('from-server:message', data);
	});

	// Escuchar, mientras se escribe
	// socket.on('chat:writing', (data) => {

	// 	// Emitir a todas las conexiones, excepto yo
	// 	socket.broadcast.emit('from-server:writing', data);
	// });

	// Escuchar, mientras se escribe (version keydown y keyup)
	socket.on('chat:keydown', (data) => {
		socket.broadcast.emit('from-server:keydown', data);
	});

	socket.on('chat:keyup', (data) => {
		socket.broadcast.emit('from-server:keyup', data);
	});
});
