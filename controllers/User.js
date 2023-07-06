'user strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt');
var User = require('../models/user');
var jwt = require('../services/jwt');


const saltRounds = 10;

const saveUser = async(req,res) => {
	var user = new User();

	var params = req.body;
	const {rut, email, clave, nombre} = req.body;

	user.nombre = params.nombre;
	user.apellido = params.apellido;
	user.rut = params.rut;
	user.email = params.email;
	user.rol = 'ROLE_ADMIN';
	user.saldo = params.saldo;
	
	
	const existeRut = await user.findOne({rut});

	if(existeRut){
		res.status(400).send({message: 'El rut ya existe'} );
	}else{
		if(params.clave != undefined){
		// Encriptar contraseña y guardar datos
		bcrypt.genSalt(saltRounds, function(err, salt) {
			bcrypt.hash(params.clave,salt,function(err, hash){
				user.clave = hash;
				if(user.nombre != null 
					&& user.apellido != null
					&& user.rut != null 
					&& user.email != null){
						// Guardar el user
						
							user.save((err, userStored) =>{
							if(err){
								res.status(500).send({message: 'Error al guardar el user'});
							}else{
								if(!userStored){
									res.status(404).send({message: 'No se ha registrado el user'});
						
								}else{
									res.status(200).send({user: userStored});
						
								}
				
							}
							});
						
						
				}else{
					res.status(200).send({message: 'Rellena todos los campos'});
				}
			});
		});
		
	}else{
		res.status(200).send({message: 'Introduce la contraseña'});
	}
	}
}

const loginUser = async (request, response, next) => {
 
 	var params = request.body;

	console.log(params);
	var rut = params.rut;
	var clave = params.clave;
   
    const user = await user.findOne({ rut});
    console.log(user);
    if (user) {
    
      //Comprobar la contraseña
			const check = await bcrypt.compare(clave, user.clave);
			console.log(check);
					if(check){
						//veolver los datos del user logeado
						if(params.gethash){
							//devolver un token de jwt
							response.status(200).send({
								token: jwt.createToken(user)
							});
						}else{
							response.status(200).send({user});
						}
					}else{
						response.status(404).send({message: 'El user no ha podido loguearse'});
					}
				
    } else {
      response.status(404).send({message: 'El user no ha podido loguearse'});
    }
  
};



function updateUser(req, res){
	var userId = req.params.id;
	var actualiza = req.body;

	user.findByIdAndUpdate(userId, actualiza, (err,userUpdate) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar el user'});
		}else{
			if(!userUpdate){
				res.status(404).send({message: 'No se ha podido actualizar el user'});
			}else{
				res.status(200).send({user: userUpdate});
			}
		}
	});

}

function updateSaldo(req, res){
	var userId = req.params.id;
	var actualiza = req.body;
	var saldo = actualiza.saldo;
	user.findByIdAndUpdate(userId, saldo, (err,userSaldoUpdate) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar el saldo del user'});
		}else{
			if(!userSaldoUpdate){
				res.status(404).send({message: 'No se ha podido actualizar el saldo del user'});
			}else{
				res.status(200).send({user: userSaldoUpdate});
			}
		}
	});

}

function getSaldo(req, res){
	// BODY PARSE LO CONVIERTE A OBJETO JSON
	var userId = req.params.id;
	
	
	user.findOne({_id:userId}, (err, user) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!user){
				res.status(404).send({message: 'El user no existe'});
			}else{	
				let saldo = user.saldo;
				res.status(200).send({saldo});				
			}

		}
	});		

}

function getuser(req, res){
	// BODY PARSE LO CONVIERTE A OBJETO JSON

	var params = req.body;

	var rut = params.rut;
	var clave = params.clave;
	
	user.findOne({rut}, (err, user) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!user){
				res.status(404).send({message: 'El user no existe'});
			}else{
				
				res.status(200).send({user});	
				
			}

		}
	});	

}


module.exports = {
	saveUser,
	loginUser,
	updateUser,
	updateSaldo,
	getSaldo,
	getuser
}