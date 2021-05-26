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

	// Enviar datos al server
	if (message.value !== '') {
		socket.emit('chat:message', sendMsg);
	}

	message.value = ''; // Borrar el mensaje del campo, despues de enviarlo
});

// Mientras está escribiendo en el campo "mensaje" - Version del tutorial
// message.addEventListener('keypress', () => {
// 	socket.emit('chat:writing', username.value);
// });

// Version con keydown y keyup - Al apretar una tecla en el campo "mensaje"
message.addEventListener('keydown', () => {
	socket.emit('chat:keydown', username.value);
});

message.addEventListener('keyup', () => {
	socket.emit('chat:keyup', '');
});

message.addEventListener('focusout', () => {
	// focusout - Al dejar el foco del campo de texto
	socket.emit('chat:keyup', ''); // emito el mismo evento para limpiar el texto de "escribiendo..."
});

// Escuchar eventos
// Al recibir un evento (envio del mensaje) desde el server
socket.on('from-server:message', (data) => {
	actions.innerHTML = ''; // Limpiar div de "escribiendo"
	output.innerHTML += `<p>
							<strong>${data.username}</strong>: ${data.message}
						</p>`;
});

// Al recibir el evento (de escritura) - Version del tutorial
// socket.on('from-server:writing', (data) => {
// 	actions.innerHTML = `<p>
// 							${data} está escribiendo...
// 						</p>`;
// });

// Al recibir el evento (de escritura) - con keydown y keyup
socket.on('from-server:keydown', (data) => {
	actions.innerHTML = `<p>
							${data} está escribiendo...
						</p>`;
});

let timeout = null;
socket.on('from-server:keyup', (data) => {
	clearTimeout(timeout);

	timeout = setTimeout(() => {
		actions.innerHTML = '';
	}, 1000);
});
