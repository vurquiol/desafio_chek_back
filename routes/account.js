'use strict'

var express = require('express');
var AccountController = require('../controllers/account');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');

api.post('/balance', AccountController.balance);
api.post('/saveBalance', AccountController.saveBalance);
module.exports = api;
