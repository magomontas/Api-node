var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DetalleVentaSchema = Schema({
    idproducto: {type: Schema.ObjectId, ref: 'producto'},
    cantidad: Number,
    idventa: {type: Schema.ObjectId, ref: 'venta'}
    // subtotal: Number
});

module.exports = mongoose.model('detalleventa', DetalleVentaSchema);