var express = require('express');
var ClienteController = require('../controllers/ClienteController');

var api = express.Router();

api.post('/cliente/registrar', ClienteController.registrar);
api.patch('/cliente/editar/:id', ClienteController.editar);
api.delete('/cliente/eliminar/:id', ClienteController.eliminar);
api.get('/clientes', ClienteController.listar);
api.get('/cliente/:id', ClienteController.get_cliente);



module.exports = api;
