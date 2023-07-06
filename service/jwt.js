'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_desafio';

// encode
exports.createToken = function(usuario){
	var payload = {
		sub: usuario._id,
		nombre: usuario.nombre,
		rut: usuario.rut, 
		apellido: usuario.apellido,
		email: usuario.email,
		role: usuario.role,
		iat:moment().unix(),
		exp: moment().add(30, 'days').unix
	}

	return jwt.encode(payload, secret);
}