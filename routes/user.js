const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/login', usuarioController.login);
router.post('/register', usuarioController.register);
router.get('/', usuarioController.getAllUsers);

module.exports = router;