const express = require('express');
const router = express.Router();
const conversaController = require('../controllers/conversaController.js');

// Defina as rotas para conversas conforme necessário
router.get('/usuario', conversaController.getConversasUsuario);
router.get('/:idConversa', conversaController.getHistoricoConversaById);

module.exports = router;
