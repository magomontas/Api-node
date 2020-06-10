var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MapasSchema = Schema({
    latitud: String,
    longitud: String,
    id_usuario: {type: Schema.ObjectId, ref: 'user'},
});

module.exports = mongoose.model('mapas', MapasSchema);
