
var Mapa = require('../models/mapas');

function registrar(req, res) {
    var data = req.body;
    var mapa = new Mapa();

    mapa.latitud = data.latitud;
    mapa.longitud = data.longitud;
    mapa.id_usuario = data.id_usuario;

    mapa.save((err, mapa_save) => {
        if (err) {
            res.status(500).send({ mensaje: "Error de server" });
        } else {
            if (mapa_save) {
                res.status(200).send({ mapa: mapa_save });
            } else {
                res.status(401).send({ mensaje: "Error al crear la dirección" });
            }
        }
    });

}

function editar(req, res) {
    var id = req.params['id'];
    var data = req.body;

    Mapa.findByIdAndUpdate({ _id: id }, { longitud: data.longitud, latitud: data.latitud}, (err, map_edit) => {
        if (err) {
            res.status(500).send({ mensaje: "Error de server" });
        } else {
            if (map_edit) {
                res.status(200).send({ mapa: map_edit });
            } else {
                res.status(500).send({ mensaje: "No se ha podido Editar la dirección" });
            }
        }

    });
}

function listar(req, res) {
    Mapa.find((err, mapa_data) => {
        if (mapa_data) {
            res.status(200).send({mapas: mapa_data})
        } else {
            res.status(404).send({mensaje: "No se encontraron las direcciones"})
        }
    })
}

function eliminar(req, res) {
    var id = req.params['id'];

    Mapa.findByIdAndRemove(id, (err, map_delete) => {
        if(err) {
            res.status(500).send({mensaje: "Error de server"});
        } else {
            if(map_delete) {
                res.status(200).send({mapa: map_delete});
            } else {
                res.status(401).send({mensaje: "No se pudo eliminar la dirección"});
            }
        }
    });
}

function get_map(req, res) {
    var id = req.params['id']

    Mapa.findById({_id: id}, (err, one_map) => {
        if (one_map){
            res.status(200).send({map: one_map})
        } else {
            res.status(404).send({mensaje: 'No se encuentra la dorección con ese ID'})
        }
    })
}

module.exports = {
    registrar,
    editar,
    eliminar,
    listar,
    get_map
}
