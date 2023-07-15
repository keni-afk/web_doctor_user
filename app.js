import LoginManager from './login.js';
import RegistroManager from './registro.js';

const loginManager = new LoginManager();
const registroManager = new RegistroManager();

// Seleccionar elementos HTML relevantes para el login y registro
const formularioLogin = document.getElementById('formulario-login');
const formularioRegistro = document.getElementById('formulario-registro');

// Agregar manejador de evento para el formulario de login
formularioLogin.addEventListener('submit', (event) => {
    event.preventDefault();

    const usuario = document.querySelector('#input-usuario').value;
    const contraseña = document.querySelector('#input-contraseña').value;

    // Utilizar la clase LoginManager para validar las credenciales
    if (loginManager.validarCredenciales(usuario, contraseña)) {
        console.log('Inicio de sesión exitoso');

        // Almacenar información de sesión en el localStorage
        localStorage.setItem('username', usuario);
        localStorage.setItem('accessToken', loginManager.generarTokenAcceso(usuario));

        window.location.href = 'inicio.html'; // Redireccionar a la página de dashboard
    } else {
        console.log('Credenciales inválidas');
        // Realizar acciones adicionales en caso de credenciales inválidas
    }
});

// Agregar manejador de evento para el formulario de registro
formularioRegistro.addEventListener('submit', (event) => {
    event.preventDefault();

    // Obtener los valores del usuario, contraseña y email ingresados en el formulario
    const usuario = document.getElementById('input-usuario-registro').value;
    const contraseña = document.getElementById('input-contraseña-registro').value;
    const email = document.getElementById('input-email-registro').value;

    // Validar datos utilizando la clase RegistroManager
    if (registroManager.validarDatos(usuario, contraseña, email)) {
        // Almacenar usuario utilizando la clase RegistroManager
        registroManager.almacenarUsuario(usuario, contraseña, email);

        // Realizar acciones de éxito en el registro
        console.log('Registro exitoso');
    } else {
        // Realizar acciones de error en el registro
        console.log('Datos de registro inválidos');
    }
});

/*CHAT DOSCTOR - USER*/
const johnSelectorBtn = document.querySelector('#john-selector')
const janeSelectorBtn = document.querySelector('#jane-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')

const messages = JSON.parse(localStorage.getItem('messages')) || []

const createChatMessageElement = (message) => `
<div class="message ${message.sender === 'John' ? 'blue-bg' : 'gray-bg'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
</div>
`

window.onload = () => {
    messages.forEach((message) => {
        chatMessages.innerHTML += createChatMessageElement(message)
    })
}

let messageSender = 'John'

const updateMessageSender = (name) => {
    messageSender = name
    chatHeader.innerText = `${messageSender} chatting...`
    chatInput.placeholder = `Type here, ${messageSender}...`

    if (name === 'John') {
        johnSelectorBtn.classList.add('active-person')
        janeSelectorBtn.classList.remove('active-person')
    }
    if (name === 'Jane') {
        janeSelectorBtn.classList.add('active-person')
        johnSelectorBtn.classList.remove('active-person')
    }

    /* auto-focus the input field */
    chatInput.focus()
}

johnSelectorBtn.onclick = () => updateMessageSender('John')
janeSelectorBtn.onclick = () => updateMessageSender('Jane')

const sendMessage = (e) => {
    e.preventDefault()

    const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const message = {
        sender: messageSender,
        text: chatInput.value,
        timestamp,
    }

    /* Save message to local storage */
    messages.push(message)
    localStorage.setItem('messages', JSON.stringify(messages))

    /* Add message to DOM */
    chatMessages.innerHTML += createChatMessageElement(message)

    /* Clear input field */
    chatInputForm.reset()

    /*  Scroll to bottom of chat messages */
    chatMessages.scrollTop = chatMessages.scrollHeight
}

chatInputForm.addEventListener('submit', sendMessage)

clearChatBtn.addEventListener('click', () => {
    localStorage.clear()
    chatMessages.innerHTML = ''
});

// Evento de clic en el botón o enlace de cierre de sesión
document.getElementById('logout-button').addEventListener('click', function () {
    // Borrar información de sesión del localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('accessToken');

    window.location.href = 'login.html'; // Redireccionar a la página de inicio de sesión
});