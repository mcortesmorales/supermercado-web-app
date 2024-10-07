const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors'); // Importar el paquete cors
const db = require('./config/db'); // Importar el pool

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Configurar CORS para permitir el origen del frontend
app.use(bodyParser.json());

// Verifica las variables de entorno
console.log('Conectando a la base de datos con:');
console.log('Host:', process.env.DB_HOST);
console.log('Usuario:', process.env.DB_USER);
console.log('Contraseña:', process.env.DB_PASSWORD ? '****' : 'No especificada'); // Oculta la contraseña
console.log('Base de datos:', process.env.DB_NAME);

// Importar rutas de usuario
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// Endpoint de registro
app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const [results] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (results.length > 0) return res.status(400).json({ message: 'Usuario ya existe' });

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar nuevo usuario
        await db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, hashedPassword, email]);
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// Endpoint de login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    console.log('Email recibido:', email); // Verificar el email recibido

    try {
        const [results] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        console.log('Resultados de la consulta:', results); // Mostrar los resultados

        if (results.length === 0) return res.status(401).json({ message: 'Usuario no encontrado' });

        const user = results[0];

        // Comparar contraseñas
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: 'Contraseña incorrecta' });

        // Generar un token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });  // Debería devolver el token aquí
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// Endpoint para cambiar contraseña
app.post('/change-password', async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    try {
        const [results] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (results.length === 0) return res.status(401).json({ message: 'Usuario no encontrado' });

        const user = results[0];

        // Comparar la contraseña antigua
        const match = await bcrypt.compare(oldPassword, user.password);
        if (!match) return res.status(401).json({ message: 'Contraseña antigua incorrecta' });

        // Encriptar la nueva contraseña
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar la contraseña en la base de datos
        await db.query('UPDATE users SET password = ? WHERE email = ?', [hashedNewPassword, email]);
        res.json({ message: 'Contraseña cambiada exitosamente' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});


