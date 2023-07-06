'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuario');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');

api.post('/registrar', UsuarioController.saveUser);
api.post('/logear', UsuarioController.loginUser);
api.post('/usuario', UsuarioController.getUsuario);
api.get('/saldo/:id', UsuarioController.getSaldo);
api.put('/actualiza-usuario/:id',  md_auth.ensureAuth, UsuarioController.updateUser);
api.put('/actualiza-saldo/:id',  md_auth.ensureAuth, UsuarioController.updateSaldo);
module.exports = api;
