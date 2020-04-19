var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'alonso@alas';

exports.createtoken = function(user){
    var payload = {
        sub: user.id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(2, 'days').unix(),
    }

    return jwt.encode(payload, secret);
}