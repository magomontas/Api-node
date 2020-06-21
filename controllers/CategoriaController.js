var Producto = require('../models/producto');
var Categoria = require('../models/categoria');

function registrar(req, res) {
    var data = req.body;
    var categoria = new Categoria();
    categoria.titulo = data.titulo;
    categoria.descripcion = data.descripcion;

    categoria.save()
        .then((categoria_save) => {
            res.send({categorua: categoria_save})
        })
        .catch((err) => {
            res.send({mensaje: err})
        })
}

function obtener_categoria(req, res) {
    var id = req.params['id'];
    Categoria.findById({_id: id})
        .then((categoria_data) => {
            res.send({categoria: categoria_data})
        })
        .catch((err) => {
            res.send({mensaje: err})
        })
}

function editar(req, res) {
    var id = req.params['id'];
    var data = req.body;

    Categoria.findByIdAndUpdate({_id: id}, {
        titulo: data.titulo,
        descripcion: data.descripcion
    })
        .then((categoria_edit) => {
            res.send({categoria: categoria_edit})
        })
        .catch((err) => {
            res.send({mensaje: err})
        })
}

function eliminar(req, res) {
    var id = req.params['id'];

    Categoria.findByIdAndRemove({_id: id})
        .then((categoria_delete) => {
            res.status(200).send({categoria: categoria_delete})
        })
        .catch((err) => {
            res.status(400).send({mensaje: err})
        })
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
