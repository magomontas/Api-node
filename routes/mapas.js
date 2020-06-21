var express = require('express');
var MapaController = require('../controllers/MapasController');

var api = express.Router();

api.post('/mapa/registrar', MapaController.registrar);
api.get('/mapas', MapaController.listar);
api.delete('/mapa/eliminar/:id', MapaController.eliminar);
api.patch('/mapa/editar/:id', MapaController.editar);
api.get('/mapa/:id', MapaController.get_map);


module.exports = api;
