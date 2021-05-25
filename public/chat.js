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
	console.log(sendMsg);

	// Enviar datos al server
	socket.emit('chat:message', sendMsg);
});

// Al recibir un evento (envio del mensaje) desde el server
socket.on('from-server:message', (data) => {
	output.innerHTML += `<p>
							<strong>${data.username}</strong>: ${data.message}
						</p>`;
});
