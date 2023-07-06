'use strict'

require('dotenv').config();

const express = require('express');
const cors = require('cors');
var app = require('./app');

const { dbConnection } = require('./database/config');

// Crear el servidor de express


// Configurar CORS
app.use(cors({ origin: true }));

// Base de datos
dbConnection();


app.listen(3005, () => {
    console.log('Servidor corriendo en puerto ' + 3005 );
});

