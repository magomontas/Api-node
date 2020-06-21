var Producto = require('../models/producto');
var Categoria = require('../models/categoria');
var fs = require('fs');
var path = require('path');

function registrar(req, res) {
    var data = req.body;

    // if(req.files) {
    // var imagen_path = req.files.imagen.path;
    // var name = imagen_path.split('\\');
    // var imagen_name = name[2];

    var producto = new Producto();
    producto.titulo = data.titulo;
    producto.descripcion = data.descripcion;
    producto.imagen = data.imagen;
    producto.precio_compra = data.precio_compra;
    producto.precio_venta = data.precio_venta;
    producto.stock = data.stock;
    producto.id_categoria = data.id_categoria;
    producto.puntos = data.puntos;

    producto.save((err, producto_save) => {
        if (err) {
            res.status(500).send({mensaje: "Error de server"});
        } else {
            if (producto_save) {
                res.status(200).send({producto: producto_save});
            } else {
                res.status(403).send({mensaje: "Error al ingresar el producto"});
            }
        }
    });
    // }


}

function listar(req, res) {
    var titulo = req.params['titulo'];
    Producto.find({titulo: new RegExp(titulo, 'i')}).populate('id_categoria').exec((err, productos_listado) => {
        if (err) {
            res.status(500).send({mensaje: "Error en el server"});
        } else {
            if (productos_listado) {
                res.status(200).send({producto: productos_listado});
            } else {
                res.status(404).send({mensaje: "NO se ha podido obtener el Producto"});
            }
        }
    });
}

function editar(req, res) {
    var data = req.body;
    var id = req.params['id'];
    // var img =req.params['img'];

    // if(req.files.imagen) {
    // fs.unlink('./uploads/productos/' + img, (err) => {
    //     if(err) throw err;
    // });

    // var imagen_path = req.files.imagen.path;
    // var name = imagen_path.split('\\');
    // var imagen_name = name[2];


    Producto.findByIdAndUpdate({_id: id}, {
            titulo: data.titulo,
            descripcion: data.descripcion,
            imagen: data.imagen,
            precio_compra: data.precio_compra,
            precio_venta: data.precio_venta,
            id_categoria: data.id_categoria,
            puntos: data.puntos
        }, (err, producto_edit) => {
            if (err) {
                res.status(500).send({mensaje: "Error de server"});
            } else {
                if (producto_edit) {
                    res.status(200).send({producto: producto_edit});
                } else {
                    res.status(403).send({mensaje: "Error al editar el producto"});
                }
            }
    });

}

function obtener_producto(req, res) {
    var id = req.params['id'];

    Producto.findOne({_id: id}, (err, producto_data) => {
        if (err) {
            res.status(500).send({mensaje: "Error de server"});
        } else {
            if (producto_data) {
                res.status(200).send({producto: producto_data});
            } else {
                res.status(200).send({mensaje: "Error en la busqueda del producto"});
            }
        }
    });
}

function ref_prod(req, res) {
    var id_categoria = req.params['id'];
    Categoria.findById(id_categoria, (err, cat_search) =>{
        if (cat_search) {
            Producto.find({'id_categoria': cat_search._id}, (err, product_search) => {
                if (product_search) {
                    res.status(200).send({productos: product_search})
                } else {
                    res.send({mensaje: 'No hay registros con ese ID'})
                }
            })
        } else {
            res.send({mensaje: 'Error en la busqueda'})
        }
    })
}

function eliminar(req, res) {
    var id = req.params['id'];

    Producto.findOneAndRemove({_id: id}, (err, producto_delete) => {
        if (err) {
            res.status(500).send({mensaje: "Error de server"});
        } else {
            if (producto_delete) {
                // fs.unlink('./uploads/productos/' + producto_delete.imagen, (err) => {
                //     if(err) throw err;
                // });
                res.status(200).send({producto: producto_delete});
            } else {
                res.status(401).send({mensaje: "Error al eliminar el producto"});
            }
        }
    });
}

function update_stock(req, res) {
    var id = req.params['id'];
    let data = req.body;

    Producto.findById(id, (err, producto_data) => {
        if (producto_data) {
            Producto.findByIdAndUpdate(id, {stock: parseInt(producto_data.stock) + parseInt(data.stock)}, (err, producto_edit) => {
                if (producto_data) {
                    res.status(200).send({producto: producto_edit});
                }
            });
        } else {
            res.status(500).send({Mensaje: "No se ha podido sumar el stock del producto"});
        }
    });
}

function get_img(req, res) {
    var img = req.params['img'];

    if (img != "null") {
        let path_img = './uploads/productos/' + img;
        res.status(200).sendFile(path.resolve(path_img));
    } else {
        let path_img = './uploads/productos/default.png';
        res.status(200).sendFile(path.resolve(path_img));
    }
}

function top(req, res) {
    Producto.find({}, {'precio_venta': 1, "_id": 0, 'titulo': 1}).sort({'precio_venta': -1}).limit(3).exec((err, productos_listado) => {
        if (err) {
            res.status(500).send({mensaje: "Error en el server"});
        } else {
            if (productos_listado) {
                res.status(200).send({producto: productos_listado});
            } else {
                res.status(404).send({mensaje: "NO se ha podido obtener el Producto"});
            }
        }
    });
}

module.exports = {
    registrar,
    listar,
    editar,
    obtener_producto,
    eliminar,
    update_stock,
    get_img,
    ref_prod,
    top
}
