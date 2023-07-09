'use strict'

require('dotenv').config();

const express = require('express');
const cors = require('cors');
var app = express()
var bodyParser = require('body-parser');
var morgan = require('morgan');
const errorHandler = require('./middlewares/error');

var UserController = require('./controllers/user');
var AccountController = require('./controllers/account');

morgan.token('id', function getId (req) {
	return req.id
  })

  
const { dbConnection } = require('./database/config');

// Configurar CORS
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

// Base de datos
dbConnection();

app.get('/',(req,res) => {
    res.send('Hello Node.js on App Engine Standard');
})

app.post('/api/loguer', UserController.loginUser);
app.post('/api/balance', AccountController.balance);

app.listen(process.env.PORT || 3005, () => {
    console.log('Servidor corriendo en puerto ' + 3005 );
});

