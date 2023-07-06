'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
	name:{
		type: String,
		require:true
	},
	apellido: {
		type: String,
		require:true		
	},
	rut: {
		type: String,
		require:true,
		unique: true	
	},
	email: {
		type: String,
		require:true,
		unique: true
	},
	clave: {
		type: String,
		require:true
	
	},
	rol: {
		type: String,
		require:true,
		default:'USER_ROLE'
	},
	saldo:{
		type: Number
	}
	
	
	
})

module.exports = mongoose.model('Usuario', UsuarioSchema);