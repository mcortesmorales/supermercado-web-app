const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (username, password, email) => {
    // Verificar si el usuario ya existe
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) throw { message: 'Usuario ya existe' };

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el usuario y obtener el ID del usuario recién creado
    const [result] = await db.query(
        'INSERT INTO users (username, password, email) VALUES (?, ?, ?)', 
        [username, hashedPassword, email]
    );

    const userId = result.insertId; // Obtener el ID del usuario insertado

    return { message: 'Usuario registrado exitosamente', userId };
};


// Inicio de sesión de usuario
exports.loginUser = async (email, password) => {
    const [results] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (results.length === 0) throw { message: 'Usuario no encontrado' };

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw { message: 'Contraseña incorrecta' };

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Devuelve tanto el token como el user_id
    return { token, userId: user.id };
};


// Obtener perfil de usuario
exports.getProfile = async (req, res) => {
    const userId = req.user.id;
    const [user] = await db.query('SELECT username, name, email, address, phone FROM users WHERE id = ?', [userId]);

    if (!user.length) throw { message: 'Usuario no encontrado' };

    res.json({ user: user[0] });
};

// Actualizar perfil de usuario (nombre de usuario, nombre completo, email, dirección y teléfono)
exports.updateProfile = async (userId, username, name, email, address, phone) => {
    const [existingUser] = await db.query('SELECT * FROM users WHERE username = ? AND id != ?', [username, userId]);
    if (existingUser.length > 0) throw { message: 'El nombre de usuario ya está en uso' };

    await db.query('UPDATE users SET username = ?, name = ?, email = ?, address = ?, phone = ? WHERE id = ?', 
                   [username, name, email, address, phone, userId]);
    return { message: 'Perfil actualizado exitosamente' };
};

// Cambiar contraseña
exports.changePassword = async (userId, currentPassword, newPassword) => {
    const [user] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    if (!user.length) throw { message: 'Usuario no encontrado' };

    const match = await bcrypt.compare(currentPassword, user[0].password);
    if (!match) throw { message: 'Contraseña actual incorrecta' };

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedNewPassword, userId]);

    return { message: 'Contraseña cambiada exitosamente' };
};

// Guardar detalles de compra (dirección, teléfono y nombre completo)
exports.saveUserDetails = async (userId, address, phone) => {
    await db.query('UPDATE users SET address = ?, phone = ? WHERE id = ?', [address, phone, userId]);
    return { message: 'Detalles de compra guardados exitosamente' };
};
