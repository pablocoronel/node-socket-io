const socket = io();

// DOM elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let button = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

// Eventos
// Al apretar el botón "Enviar"
button.addEventListener('click', () => {
	const sendMsg = { username: username.value, message: message.value };
	// console.log(sendMsg);

	// Enviar datos al server
	socket.emit('chat:message', sendMsg);
});

// Mientras está escribiendo en el campo "mensaje"
message.addEventListener('keypress', () => {
	// De está manera queda fijo, por eso no se usa
	// actions.innerHTML = 'Escribiendo...';

	// Forma correcta, emitiendo
	socket.emit('chat:writing', username.value);
});

// Escuchar eventos
// Al recibir un evento (envio del mensaje) desde el server
socket.on('from-server:message', (data) => {
	actions.innerHTML = ''; // Limpiar div de "escribiendo"
	output.innerHTML += `<p>
							<strong>${data.username}</strong>: ${data.message}
						</p>`;
});

// Al recibir el evento (de escritura)
socket.on('from-server:writing', (data) => {
	actions.innerHTML = `<p>
							${data} está escribiendo...
						</p>`;
});
