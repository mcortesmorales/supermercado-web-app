const express = require('express');
const { check, validationResult } = require('express-validator');
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');
const jwt = require('jsonwebtoken'); // Aseguramos que jwt esté importado correctamente

const router = express.Router();

// Registro de usuario con validaciones de entrada
router.post('/register', [
    check('username').isLength({ min: 3 }).withMessage('El nombre de usuario debe tener al menos 3 caracteres'),
    check('email').isEmail().withMessage('El email no es válido'),
    check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const message = await userController.registerUser(req.body.username, req.body.password, req.body.email);
        res.status(201).send(message);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Inicio de sesión con validación
router.post('/login', [
    check('username').not().isEmpty().withMessage('El nombre de usuario es obligatorio'),
    check('password').not().isEmpty().withMessage('La contraseña es obligatoria')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const response = await userController.loginUser(req.body.username, req.body.password);
        res.status(200).send(response);
    } catch (err) {
        res.status(401).send(err);
    }
});

// Obtener perfil de usuario (requiere autenticación)
router.get('/profile', verifyToken, userController.getProfile);

// Actualizar perfil de usuario (requiere autenticación y validación)
router.put('/profile', verifyToken, [
    check('username').isLength({ min: 3 }).withMessage('El nombre de usuario debe tener al menos 3 caracteres'),
    check('email').isEmail().withMessage('El email no es válido')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const message = await userController.updateProfile(req.user.id, req.body.username, req.body.email);
        res.status(200).send(message);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Cambiar contraseña (requiere autenticación y validación)
router.put('/change-password', verifyToken, [
    check('currentPassword').not().isEmpty().withMessage('La contraseña actual es obligatoria'),
    check('newPassword').isLength({ min: 6 }).withMessage('La nueva contraseña debe tener al menos 6 caracteres')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const message = await userController.changePassword(req.user.id, req.body.currentPassword, req.body.newPassword);
        res.status(200).send(message);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Endpoint para la renovación de token (requiere autenticación)
router.post('/refresh-token', verifyToken, async (req, res) => {
    try {
        // Generar un nuevo token con una nueva expiración
        const newToken = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ auth: true, token: newToken });
    } catch (err) {
        res.status(500).json({ message: 'Error al generar nuevo token', error: err.message });
    }
});

module.exports = router;
