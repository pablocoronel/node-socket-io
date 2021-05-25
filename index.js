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

	// Esuchar el evento
	socket.on('chat:message', (data) => {
		// console.log(data);
	});
});
