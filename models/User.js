'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
	idUser: {
		type: String,
		require:true,
		unique: true	
	},	
	name:{
		type: String,
		require:true
	},
	surname: {
		type: String,
		require:true		
	},
	
	email: {
		type: String,
		require:true,
		unique: true
	},
	password: {
		type: String,
		require:true
	
	},
	
	phone:{
		type: Number
	}
	
	
	
})

module.exports = mongoose.model('User', UserSchema);