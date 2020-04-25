var Producto = require('../models/producto');
var Categoria = require('../models/categoria');

function registrar(req, res) {
    var data = req.body;
    var categoria = new Categoria();
    categoria.titulo = data.titulo;
    categoria.descripcion = data.descripcion;

    categoria.save((err, categoria_save) => {
        if (err) {
            res.status(500).send({mensaje: "Error en el server"});
        } else {
            if (categoria_save) {
                res.status(200).send({categoria: categoria_save});
            } else {
                res.status(401).send({mensaje: "La categoria no se pudo registrar"});
            }
        }
    });
}

function obtener_categoria(req, res) {
    var id = req.params['id'];
    Categoria.findById({_id: id}, (err, categoria_data) => {
        if (err) {
            res.status(500).send({mensaje: "Error en la busqueda"});
        } else {
            if (categoria_data) {
                res.status(200).send({categoria: categoria_data});
            } else {
                res.status(404).send({mensaje: "La categoria no existe"});
            }
        }
    });

}

function editar(req, res) {
    var id = req.params['id'];
    var data = req.body;

    Categoria.findByIdAndUpdate({_id: id}, {
        titulo: data.titulo,
        descripcion: data.descripcion
    }, (err, categoria_edit) => {
        if (err) {
            res.status(500).send({mensaje: 'Error al obtener la categoria'});
        } else {
            if (categoria_edit) {
                res.status(200).send({categoria: categoria_edit});
            } else {
                res.status(404).send({mnsaje: "NO se ha actualizado la categora"});
            }
        }
    });
}

function eliminar(req, res) {
    var id = req.params['id'];

    Categoria.findByIdAndRemove({_id: id}, (err, categoria_delete) => {
        if (err) {
            res.status(500).send({mensaje: "Error para encontrar la categoria"});
        } else {
            if (categoria_delete) {
                res.status(200).send({categoria: categoria_delete});
            } else {
                res.status(404).send({mensaje: "Error al eliminarr la Categoria"});
            }
        }
    });
}

function listar(req, res) {
    var nombre = req.params.nombre;

    Categoria.find({titulo: new RegExp(nombre, 'i')}, (err, categoria_list) => {
        if (err) {
            res.status(500).send({mensaje: "Error para encontrar la categoria"});
        } else {
            if (categoria_list) {
                res.status(200).send({categorias: categoria_list});
            } else {
                res.status(404).send({mensaje: "No hay registros para ese nombre"});
            }
        }
    });
}

module.exports = {
    registrar,
    obtener_categoria,
    editar,
    eliminar,
    listar,
}
