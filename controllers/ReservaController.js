var Reserva = require('../models/reserva')
var Producto = require('../models/producto')

function registrar(req, res) {
    var data = req.body;
    var reserva = new Reserva();
    reserva.idcliente = data.idcliente;
    reserva.iduser = data.iduser;
    reserva.idproducto = data.idproducto;
    reserva.cantidad = data.cantidad;
    reserva.total = data.total;

    reserva.save((err, reserva_save) => {
        if (reserva_save) {
            Producto.findById({_id: data.idproducto}, (err, producto_data) => {
                if (producto_data) {
                    Producto.findByIdAndUpdate({_id: producto_data._id}, {stock: parseInt(producto_data.stock) - parseInt(data.cantidad)}, (err, producto_edit) => {
                        if (producto_edit) {
                            res.status(200).send({reserva: reserva_save})
                        } else {
                            res.status(400).send({mensaje: 'error en la actualizacion del producto'})
                        }
                    });
                } else {
                    res.status(404).send({mensaje: "No se encontro el producto"});
                }
            });
        } else {
            res.status(401).send({mensaje: "Error al registrar"});
        }
    });
}

function listado(req, res) {
    Reserva.find().populate('idcliente').populate('iduser').populate('idproducto').exec(
        (err, listado) => {
            if (listado) {
                res.status(200).send({reservas: listado})
            } else {
                res.status(404).send({mensaje: "Error en la busqueda"})
            }
        })
}

// function editar(req, res) {
//     var id = req.params['id'];
//     var data = req.body;
//
//     Reserva.findByIdAndUpdate({ _id: id }, { cantidad: data.cantidad, total: data.total }, (err, reserva_edit) => {
//         if (err) {
//             res.status(500).send({ mensaje: "Error de server" });
//         } else {
//             if (reserva_edit) {
//                 res.status(200).send({ reserva: reserva_edit });
//             } else {
//                 res.status(500).send({ mensaje: "No se ha podido Editar el registro" });
//             }
//         }
//
//     });
// }

function eliminar(req, res) {
    var id = req.params['id'];
    Reserva.findByIdAndRemove(id, (err, reserva_delete) => {
        //Logica de regresar los productos que se habian descontado en la reserva
        if (reserva_delete) {
            Producto.findById({_id: reserva_delete.idproducto}, (err, producto_data) => {
                if (producto_data) {
                    Producto.findByIdAndUpdate({_id: producto_data._id}, {stock: parseInt(producto_data.stock) + parseInt(reserva_delete.cantidad)}, (err, producto_edit) => {
                        if (producto_edit) {
                            res.status(200).send({reserva: reserva_delete})
                        } else {
                            res.status(400).send({mensaje: 'error en la actualizacion del producto'})
                        }
                    });
                } else {
                    res.status(404).send({mensaje: "No se encontro el producto"});
                }
            });
        }



    })
}

module.exports = {
    registrar,
    listado,
    eliminar,
    // editar
}
