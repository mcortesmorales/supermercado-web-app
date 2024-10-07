const db = require('./config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = (username, password) => {
    const hashedPassword = bcrypt.hashSync(password, 8);
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    return new Promise((resolve, reject) => {
        db.query(sql, [username, hashedPassword], (err, result) => {
            if (err) return reject(err);
            resolve('Usuario registrado');
        });
    });
};

const loginUser = (username, password) => {
    const sql = 'SELECT * FROM users WHERE username = ?';
    return new Promise((resolve, reject) => {
        db.query(sql, [username], (err, results) => {
            if (err || results.length === 0) return reject('Usuario no encontrado');
            const user = results[0];
            const passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid) return reject('Contraseña incorrecta');
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 });
            resolve({ auth: true, token });
        });
    });
};

const getUserProfile = (id) => {
    const sql = 'SELECT username, email FROM users WHERE id = ?'; // Solo selecciona lo necesario
    return new Promise((resolve, reject) => {
        db.query(sql, [id], (err, result) => {
            if (err) return reject(err);
            resolve(result[0]);
        });
    });
};

// Nueva función para actualizar el perfil del usuario
const updateUserProfile = (id, username, email) => {
    const sql = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.query(sql, [username, email, id], (err, result) => {
            if (err) return reject(err);
            if (result.affectedRows === 0) return reject('Usuario no encontrado');
            resolve('Perfil actualizado exitosamente');
        });
    });
};

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile }; // Exportar la nueva función
