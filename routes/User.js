'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');

api.post('/loger', UserController.loginUser);
api.post('/register', UserController.saveUser);
module.exports = api;
