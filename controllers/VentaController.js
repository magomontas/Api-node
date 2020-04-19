var Venta = require('../models/ventas');
var DetalleVenta = require('../models/detalleventa');
var Producto = require('../models/producto');

function registrar(req, res) {
    var data = req.body;
    var venta = new Venta();
    venta.idcliente = data.idcliente;
    venta.iduser = data.iduser;

    venta.save((err, venta_save) => {
        if (venta_save) {
            let detalles = data.detalles;

            detalles.forEach((element, index) => {
                var detalleventa = new DetalleVenta();
                detalleventa.idproducto = element.idproducto;
                detalleventa.cantidad = element.cantidad;
                detalleventa.idventa = venta_save._id;
                detalleventa.save((err, detalle_save) => {
                    if (detalle_save) {
                        Producto.findById({ _id: element.idproducto }, (err, producto_data) => {
                            if (producto_data) {
                                Producto.findByIdAndUpdate({ _id: producto_data._id }, { stock: parseInt(producto_data.stock) - parseInt(element.cantidad) }, (err, producto_edit) => {
                                    res.end();
                                });
                            } else {
                                res.status(404).send({ mensaje: "No se encontro el producto" });
                            }
                        });
                    } else {
                        res.status(401).send({ mensaje: "No se ha podido realizar la venta" });
                    }
                });
            });

        } else {
            res.status(401).send({ mensaje: "Error al registrar" });
        }
    });
}

function datos_venta(req, res) {
    var id = req.params['id'];

    Venta.findById({_id: id}, (err, data_venta) => {
        if (data_venta) {
            DetalleVenta.find({ idventa: id }, (err, data_detalle) => {
                res.status(200).send(
                    {
                        venta: data_venta,
                        detalles: data_detalle
                    }
                )
            });
        } else {
            res.status(404).send({ mensaje: "No se encontro ninguna venta" });
        }
    });
}

module.exports = {
    registrar,
    datos_venta
}