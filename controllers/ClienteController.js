
var Cliente = require('../models/cliente');

function registrar(req, res) {
    var data = req.body;
    var cliente = new Cliente();

    cliente.nombres = data.nombres;
    cliente.dui = data.dui;
    cliente.correo = data.correo;
    cliente.puntos = 10;

    cliente.save((err, cliente_save) => {
        if (err) {
            res.status(500).send({ mensaje: "Error de server" });
        } else {
            if (cliente_save) {
                res.status(200).send({ cliente: cliente_save });
            } else {
                res.status(401).send({ mensaje: "Error al crear el cliente" });
            }
        }
    });

}

function editar(req, res) {
    var id = req.params['id'];
    var data = req.body;

    Cliente.findByIdAndUpdate({ _id: id }, { nombres: data.nombres, dui: data.dui, correo: data.correo }, (err, cliente_editado) => {
        if (err) {
            res.status(500).send({ mensaje: "Error de server" });
        } else {
            if (cliente_editado) {
                res.status(200).send({ cliente: cliente_editado });
            } else {
                res.status(500).send({ mensaje: "No se ha podido Editar el registro" });
            }
        }

    });
}

function listar(req, res) {
    Cliente.find((err, cliente_data) => {
        if (cliente_data) {
            res.status(200).send({clientes: cliente_data})
        } else {
            res.status(404).send({mensaje: "No se encontraron los clientes"})
        }
    })
}

function eliminar(req, res) {
    var id = req.params['id'];
    
    Cliente.findByIdAndRemove(id, (err, cliente_eliminado) => {
        if(err) {
            res.status(500).send({mensaje: "Erro de server"});
        } else { 
            if(cliente_eliminado) {
                res.status(200).send({cliente: cliente_eliminado});
            } else {
                res.status(401).send({mensaje: "No se pudo eliminar el cliente"});
            }
        }
    });
}

function get_cliente(req, res) {
    var id = req.params['id']

    Cliente.findById({_id: id}, (err, cliente_data) => {
        if (cliente_data){
            res.status(200).send({cliente: cliente_data})
        } else {
            res.status(404).send({mensaje: 'No se encuentra el cliente con ese ID'})
        }
    })
}

module.exports = {
    registrar,
    editar,
    eliminar,
    listar,
    get_cliente
}
