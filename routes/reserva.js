var express = require('express');
var ReservaController = require('../controllers/ReservaController');

var api = express.Router();

api.post('/reserva/registrar', ReservaController.registrar);
api.get('/reservas', ReservaController.listado);
api.delete('/reserva/eliminar/:id', ReservaController.eliminar);
// api.patch('/reserva/editar/:id', ReservaController.editar);


module.exports = api;
