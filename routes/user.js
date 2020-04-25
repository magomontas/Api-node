var express = require('express');
var UserController = require('../controllers/UserController');

var api = express.Router();

api.post('/registrar', UserController.register);
api.post('/login', UserController.login);
api.get('/usuarios', UserController.listar);
api.delete('/usuario/eliminar/:id', UserController.eliminar);
api.patch('/usuario/editar/:id', UserController.editar);
api.get('/usuario/:id', UserController.getUsuario);


module.exports = api;
