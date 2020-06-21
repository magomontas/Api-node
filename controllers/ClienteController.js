var Cliente = require('../models/cliente');

function registrar(req, res) {
    var data = req.body;
    var cliente = new Cliente();

    cliente.nombres = data.nombres;
    cliente.direccion = data.direccion;
    cliente.dui = data.dui;
    cliente.correo = data.correo;
    cliente.puntos = 10;

    cliente.save()
        .then((cliente_save) => {
            res.status(200).send({cliente: cliente_save})
        })
        .catch((err) => {
            res.send({mensaje: err})
        })

}

function editar(req, res) {
    var id = req.params['id'];
    var data = req.body;
    Cliente.findByIdAndUpdate({_id: id}, {
        nombres: data.nombres,
        direccion: data.direccion,
        dui: data.dui,
        correo: data.correo
    })
        .then((cliente_editado) => {
            res.status(200).send({cliente: cliente_editado});
        })
        .catch((err) => {
            res.status(500).send({mensaje: err});
        });
}

async function listar(req, res) {

    Cliente.find().sort({'puntos': -1})
        .then((cliente_data) => {
            res.send({clientes: cliente_data})
        })
        .catch(() => {
            res.send({mensaje: "No se encontraron los clientes"})
        })
}

function eliminar(req, res) {
    var id = req.params['id'];

    Cliente.findByIdAndRemove(id)
        .then((cliente_eliminado) => {
            res.send({cliente: cliente_eliminado})
        })
        .catch((err) => {
            res.send({mensaje: err});
        })
}

function get_cliente(req, res) {
    var id = req.params['id']

    Cliente.findById({_id: id})
        .then((cliente_data) => {
            res.send({cliente: cliente_data})
        })
        .catch((err) => {
            res.send({mensaje: err})
        })
}

module.exports = {
    registrar,
    editar,
    eliminar,
    listar,
    get_cliente
}
