var express = require('express');
var CategoriaController = require('../controllers/CategoriaController');

var api = express.Router();

api.post('/categoria/registrar', CategoriaController.registrar);
api.get('/categoria/:id', CategoriaController.obtener_categoria);
api.patch('/categoria/editar/:id', CategoriaController.editar);
api.delete('/categoria/eliminar/:id', CategoriaController.eliminar);
api.get('/categorias/:nombre?', CategoriaController.listar);


module.exports = api;