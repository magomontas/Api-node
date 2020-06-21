var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');

function register(req, res) {
    var params = req.body;
    var user = new User();


    if (params.password) {
        bcrypt.hash(params.password, null, null, function (err, hash) {
            if (hash) {
                user.password = hash;
                user.nombres = params.nombres;
                user.apellidos = params.apellidos;
                user.email = params.email;
                user.role = params.role;
                user.save()
                    .then((user_save) => {
                        res.status(200).send({user: user_save});
                    })
                    .catch((err) => {
                        res.send({mensaje: err})
                    })
            }
        });
    } else {
        res.status(401).send({error: "No ingreso la Contraseña"});
    }

}

function login(req, res) {
    var data = req.body;

    User.findOne({email: data.email}, (err, user_data) => {
        if (err) {
            res.status(500).send({mensaje: 'Error en el servidor'});
        } else {
            if (user_data) {
                bcrypt.compare(data.password, user_data.password, function (err, check) {
                    if (check) {
                        if (data.gettoken) {
                            res.status(200).send({
                                user: user_data,
                                jwt: jwt.createtoken(user_data),
                            });
                        } else {
                            res.status(200).send({
                                user: user_data,
                                jwt: jwt.createtoken(user_data),
                                mensaje: 'No ha adquirido un token',
                            });
                        }
                    } else {
                        res.status(410).send({mensaje: 'Las contraseñas no Coinciden.'});
                    }
                });
            } else {
                res.status(401).send({mensaje: 'El correo no existe'});
            }
        }
    });
}

function listar(req, res) {
    User.find()
        .then((user_data) => {
            res.send({usuarios: user_data})
        })
        .catch((err) => {
            res.send({mensaje: err})
        })
}

function editar(req, res) {
    var data = req.body;
    var id = req.params['id'];

    if (data.password) {
        bcrypt.hash(data.password, null, null, function (err, hash) {
            if (hash) {
                User.findByIdAndUpdate({_id: id}, {
                    nombres: data.nombres,
                    apellidos: data.apellidos,
                    email: data.email,
                    password: hash,
                    role: data.role
                })
                    .then((user_edit) => {
                        res.status(200).send({usuario: user_edit});
                    })
                    .catch((err) => {
                        res.send({mensaje: err})
                    })
            }
        });
    } else {
        res.status(401).send({error: "No ingreso la Contraseña"});
    }

}

function getUsuario(req, res) {
    var id = req.params['id']
    User.findById({_id: id})
        .then((usuario_data) => {
            res.send({usuario: usuario_data})
        })
        .catch((err) => {
            res.send({mensaje: err})
        })
}

function eliminar(req, res) {
    var id = req.params['id'];

    User.findOneAndRemove({_id: id})
        .then((user_delete) => {
            res.send({user: user_delete})
        })
        .catch((err) => {
            res.send({mensaje: err})
        })
}

module.exports = {
    register,
    login,
    listar,
    eliminar,
    editar,
    getUsuario
}
