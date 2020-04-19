var express = require('express');
var ProductoController = require('../controllers/ProductoController');
var multipart = require('connect-multiparty');
var path = multipart({uploadDir: './uploads/productos'});

var api = express.Router();

api.post('/producto/registrar', ProductoController.registrar);
api.get('/productos/:titulo?', ProductoController.listar);
api.get('/producto/:id', ProductoController.obtener_producto);
api.patch('/producto/editar/:id', ProductoController.editar);
api.delete('/producto/:id', ProductoController.eliminar);
api.patch('/producto/stock/:id', ProductoController.update_stock);
api.get('/producto/img/:img', ProductoController.get_img);


module.exports = api;
