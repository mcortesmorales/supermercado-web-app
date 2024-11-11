const express = require('express');
const { check, validationResult } = require('express-validator');
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

// Registro de usuario
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
        console.log(err);
        res.status(500).send(err);
    }
});

// Inicio de sesión
router.post('/login', [
    check('email').isEmail().withMessage('El email no es válido'),
    check('password').not().isEmpty().withMessage('La contraseña es obligatoria')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const response = await userController.loginUser(req.body.email, req.body.password);
        res.status(200).json(response);  // Devuelve el token y el user_id en formato JSON
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: err.message });
    }
});


// Obtener perfil de usuario
router.get('/profile', verifyToken, userController.getProfile);

// Actualizar perfil de usuario
router.put('/profile', verifyToken, [
    check('username').isLength({ min: 3 }).withMessage('El nombre de usuario debe tener al menos 3 caracteres'),
    check('name').isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    check('email').isEmail().withMessage('El email no es válido'),
    check('address').isLength({ min: 3 }).withMessage('La dirección debe tener al menos 3 caracteres'),
    check('phone').isLength({ min: 8 }).withMessage('El teléfono debe tener al menos 8 caracteres')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const message = await userController.updateProfile(
            req.user.id, 
            req.body.username, 
            req.body.name, 
            req.body.email, 
            req.body.address, 
            req.body.phone
        );
        res.status(200).send(message);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// Cambiar contraseña
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
        console.log(err)
        res.status(500).send(err);
    }
});

// Guardar detalles de compra
router.post('/user-details', verifyToken, [
    check('username').isLength({ min: 3 }).withMessage('El nombre de usuario debe tener al menos 3 caracteres'),
    check('address').isLength({ min: 3 }).withMessage('La dirección debe tener al menos 3 caracteres'),
    check('phone').isLength({ min: 8 }).withMessage('El teléfono debe tener al menos 8 caracteres')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const message = await userController.saveUserDetails(req.user.id, req.body.username, req.body.address, req.body.phone);
        res.status(200).json(message);
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
});

module.exports = router;
