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

module.exports = {
    register, 
    login
}