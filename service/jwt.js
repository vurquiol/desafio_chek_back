'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_desafio';

// encode
exports.createToken = function(user){
	var payload = {		
		sub: user._id,
		idUser: user.idUser,
		name: user.name,
		surname: user.surname, 		
		email: user.email,
		phone: user.phone,		
		iat:moment().unix(),
		exp: moment().add(30, 'days').unix
	}

	return jwt.encode(payload, secret);
}