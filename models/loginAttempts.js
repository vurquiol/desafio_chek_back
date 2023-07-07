const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginAttemptSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    usuario: { type: String, required: true },
    exitoso: { type: Boolean, required: true },
    fecha: { type: Date, default: Date.now }
  });

  module.exports = mongoose.model('LoginAttempt', loginAttemptSchema);
