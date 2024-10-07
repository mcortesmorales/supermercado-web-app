// src/middlewares/verifyToken.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    // Obtener el token del header 'x-access-token'
    const token = req.headers['x-access-token']; 

    if (!token) return res.status(403).json({ message: 'Token no proporcionado' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Token inválido' });
        req.user = decoded; // Guardar el ID del usuario en la solicitud
        next(); // Pasar al siguiente middleware o ruta
    });
};

module.exports = verifyToken;
