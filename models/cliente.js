var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
    nombres: String,
    direccion: String,
    dui: String,
    correo: String,
    puntos: String,
    createAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('cliente', ClienteSchema);
