var express = require('express');
var VentaController = require('../controllers/VentaController');

var api = express.Router();

// api.post('/login', UserController.login);
api.post('/venta/registrar', VentaController.registrar);
api.get('/venta/datos/:id', VentaController.datos_venta);
api.get('/ventas', VentaController.listado_venta);
api.get('/ventas/all', VentaController.top_details);
api.get('/venta/data/:id', VentaController.detalle_venta);


module.exports = api;
