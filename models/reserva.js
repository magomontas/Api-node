var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReservaSchema = Schema({
    idcliente: {type: Schema.ObjectId, ref: 'cliente'},
    iduser: {type: Schema.ObjectId, ref: 'user'},
    idproducto: {type: Schema.ObjectId, ref: 'producto'},
    fecha: {type: Date, default: Date.now},
    cantidad: Number,
    total: Number,
});

module.exports = mongoose.model('reserva', ReservaSchema);
