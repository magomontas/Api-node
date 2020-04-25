var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');

function register(req, res) {
    var params = req.body;
    var user = new User();


    if(params.password) {
        bcrypt.hash(params.password, null, null, function(err, hash){
            if(hash){
                user.password = hash;
                user.nombres = params.nombres;
                user.apellidos = params.apellidos;
                user.email = params.email;
                user.role = params.role;
                
                user.save((err, user_save) => {
                    if(err) {
                        res.status(500).send({error: 'Rellene todos los campos'});
                    }else {
                        res.status(200).send({user: user_save});
                    }
                });
            }
        });
    }else {
        res.status(401).send({error: "No ingreso la Contraseña"});
    }
    
}

function login(req, res) {
    var data = req.body;

    User.findOne({email: data.email}, (err, user_data) => {
        if(err) {
            res.status(500).send({mensaje: 'Error en el servidor'});
        } else {
           if(user_data){
            bcrypt.compare(data.password, user_data.password, function(err, check) {
                if(check) {
                   if(data.gettoken) {
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

function listar (req, res) {
    User.find((err, user_data) => {
        if (user_data) {
            res.status(200).send({usuarios: user_data})
        }
    })
}

function editar(req, res) {
    var data = req.body;
    var id = req.params['id'];

    User.findByIdAndUpdate({_id: id}, {
        nombres: data.nombres,
        apellidos: data.apellidos,
        email: data.email,
        password: data.password,
        role: data.role
    }, (err, user_edit) => {
        if (err) {
            res.status(500).send({mensaje: "Error de server"});
        } else {
            if (user_edit) {
                res.status(200).send({usuario: user_edit});
            } else {
                res.status(403).send({mensaje: "Error al editar el usuario"});
            }
        }
    });

}

function getUsuario(req, res) {
    var id = req.params['id']

    User.findById({_id: id}, (err, user_data) => {
        if (user_data){
            res.status(200).send({usuario: user_data})
        } else {
            res.status(404).send({mensaje: 'No se encuentra el usuario con ese ID'})
        }
    })
}

function eliminar(req, res) {
    var id = req.params['id'];

    User.findOneAndRemove({_id: id}, (err, user_delete) => {
        if(err) {
            res.status(500).send({mensaje: "Error de server"});
        } else {
            if(user_delete) {
                res.status(200).send({user: user_delete});
            } else {
                res.status(401).send({mensaje: "Error al eliminar el usuario"});
            }
        }
    });
}

module.exports = {
    register, 
    login,
    listar,
    eliminar,
    editar,
    getUsuario
}
