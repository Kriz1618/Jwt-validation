const express = require('express');

const app = express();

app.use(express.json()); // Para que el servidor pueda procesar archivos json
app.use(express.urlencoded({extended: false })); // PAra que el servidor comprenda los datos enviados desde un formulario y lo convierta en un objeto de js 
app.use(require('./controllers/authController'));

module.exports = app;