'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();



var user_routes =require('./routes/user');
var account_routes =require('./routes/account');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/pruebas',function (req, res){
    res.status(200).send({message: 'Bienvenido al desafio Chek'});
});

app.use('/api', user_routes);
app.use('/api', account_routes);
module.exports = app;

