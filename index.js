'use strict'

require('dotenv').config();

const express = require('express');
var app = express()
var bodyParser = require('body-parser');
var morgan = require('morgan');
const errorHandler = require('./middlewares/error');

var UserController = require('./controllers/user');
var AccountController = require('./controllers/account');
var md_auth = require('./middlewares/authenticated');


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
    res.send('DEPLOY GCP TEST1');
})

//agregar el md_auth para el uso del token
app.post('/api/loguer', UserController.loginUser);
app.post('/api/register', UserController.saveUser);
app.post('/api/loginRegister', UserController.loginRegister);


app.post('/api/balance', AccountController.balance);
app.post('/api/historical', AccountController.historicalAttempt);
app.post('/api/saveBalance', AccountController.saveBalance);

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor corriendo en puerto ' + 3000 );
});

module.exports = app;