var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 4201;

var app = express();
// ROUTES
var user_routes = require('./routes/user');
var categoria_routes = require('./routes/categoria');
var producto_routes = require('./routes/producto');
var cliente_routes = require('./routes/cliente');
var venta_route = require('./routes/venta');


mongoose.connect("mongodb://localhost:27017/sistema", {useUnifiedTopology: true, useNewUrlParser: true}, (err, res)=>{
    if(err){
        throw err;
    }else{
        console.log("Corriendo el servidor");
        app.listen(port, function(){
            console.log("Servidor en el puerto " + port);
            
        });
    }
});

app.use(bodyparser.urlencoded((extended = true)));
app.use(bodyparser.json());

app.use((req,res,next)=>{
    res.header('Content-Type: application/json');
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, PATCH, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/api', user_routes);
app.use('/api', categoria_routes);
app.use('/api', producto_routes);
app.use('/api', cliente_routes);
app.use('/api', venta_route);

module.exports = app;
