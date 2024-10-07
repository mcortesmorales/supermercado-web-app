// src/controllers/userController.js
const db = require('../config/db'); // Configuración de la base de datos
const bcrypt = require('bcrypt'); // Importar bcrypt para manejar contraseñas

// Función para manejar errores
const handleError = (res, err, status = 500) => {
    return res.status(status).json({ message: 'Error del servidor', error: err.message });
};

// Obtener perfil de usuario
exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Acceder a userId desde req.user
        const [user] = await db.query('SELECT username, email FROM users WHERE id = ?', [userId]);

        if (!user.length) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ user: user[0] }); // Enviar solo el primer usuario
    } catch (err) {
        handleError(res, err);
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Acceder a userId desde req.user
        const { username, email } = req.body;

        // Verificar si el nuevo nombre de usuario ya existe
        const [existingUser] = await db.query('SELECT * FROM users WHERE username = ? AND id != ?', [username, userId]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
        }

        const [result] = await db.query('UPDATE users SET username = ?, email = ? WHERE id = ?', [username, email, userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ message: 'Perfil actualizado exitosamente' });
    } catch (err) {
        res.status(500).json({ message: 'Error del servidor', error: err });
    }
};


// Cambiar contraseña
exports.changePassword = async (req, res) => {
    try {
        const userId = req.user.id; // Acceder a userId desde req.user
        const { currentPassword, newPassword } = req.body;

        // Validación de contraseñas
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'La contraseña actual y la nueva son obligatorias.' });
        }

        // Verificar el usuario
        const [user] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
        if (!user.length) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Comparar la contraseña actual
        const match = await bcrypt.compare(currentPassword, user[0].password);
        if (!match) {
            return res.status(401).json({ message: 'Contraseña actual incorrecta' });
        }

        // Encriptar la nueva contraseña
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar la contraseña en la base de datos
        await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedNewPassword, userId]);

        res.json({ message: 'Contraseña cambiada exitosamente' });
    } catch (err) {
        handleError(res, err);
    }
};
