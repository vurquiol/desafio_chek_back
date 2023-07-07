'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountSchema = Schema({
	idAccount: {
		type: Number,
		require:true,
		unique: true	
	},	

	userCompleteName: {
		type: String,
	},

	idUser:{ type: Number, require:true,}
    ,

	accountBalance:{
		type: Number
	}
	
})

module.exports = mongoose.model('Account', AccountSchema);