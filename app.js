'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
const errorHandler = require('./middlewares/error');

var user_routes =require('./routes/user');
var account_routes =require('./routes/account');

morgan.token('id', function getId (req) {
	return req.id
  })


app.use(errorHandler);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan(':id :method :url :response-time'))

app.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');

	next();
});

app.use('/api', user_routes);
app.use('/api', account_routes);
module.exports = app;

