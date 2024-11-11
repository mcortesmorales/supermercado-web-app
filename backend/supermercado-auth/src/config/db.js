// src/config/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

// Crear pool de conexiones
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

// Función para inicializar la base de datos
async function initializeDatabase() {
    try {
        // Crear base de datos si no existe
        await pool.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        console.log(`Base de datos ${process.env.DB_NAME} verificada o creada`);

        // Cambiar a la base de datos
        await pool.query(`USE \`${process.env.DB_NAME}\`;`);

        // Crear tabla 'users' si no existe
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INT(11) NOT NULL AUTO_INCREMENT,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                address VARCHAR(255),
                phone VARCHAR(20),
                name VARCHAR(255),
                PRIMARY KEY (id)
            );
        `;
        await pool.query(createTableQuery);
        console.log('Tabla de usuarios verificada o creada');
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
        throw error;
    }
}

// Ejecutar la inicialización de la base de datos al cargar el módulo
initializeDatabase();

module.exports = pool; // Exportar el pool
