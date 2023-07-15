const express = require('express');
const app = express();
const loginManager = require('./login.js');
const registroManager = require('./registro.js');

// Endpoint para el inicio de sesión
app.post('/api/login', (req, res) => {
  const { usuario, contraseña } = req.body;

  if (loginManager.validarCredenciales(usuario, contraseña)) {
    const token = loginManager.generarTokenAcceso(usuario);
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Credenciales inválidas' });
  }
});

// Endpoint para el registro de usuario
app.post('/api/registro', (req, res) => {
  const { usuario, contraseña, email } = req.body;

  if (registroManager.validarDatos(usuario, contraseña, email)) {
    registroManager.almacenarUsuario(usuario, contraseña, email);
    res.json({ success: true, message: 'Registro exitoso' });
  } else {
    res.status(400).json({ success: false, message: 'Datos de registro inválidos' });
  }
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('API Gateway listening on port 3000');
});
