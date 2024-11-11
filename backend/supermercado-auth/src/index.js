const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');

const app = express();
const PORT = 4000; // Cambia el puerto a 4000 según tu configuración de Docker

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Permite el origen del frontend
app.use(bodyParser.json());

// Verificación de variables de entorno
console.log('Conectando a la base de datos con:');
console.log('Host:', process.env.DB_HOST);
console.log('Usuario:', process.env.DB_USER);
console.log('Contraseña:', process.env.DB_PASSWORD ? '****' : 'No especificada');
console.log('Base de datos:', process.env.DB_NAME);

// Importar rutas de usuario
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes); // Monte las rutas en /api


// Middleware para manejo de errores en Express
app.use((err, req, res, next) => {
    console.error('Error interno del servidor:', err);  // Muestra el error en la consola
    res.status(500).json({ message: 'Hubo un error en el servidor.' });
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});