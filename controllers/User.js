'user strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt');
var User = require('../models/user');
var jwt = require('../service/jwt');


const saltRounds = 10;

const saveUser = async(req,res) => {
	var user = new User();

	var params = req.body;
	const {idUser, email, password, name, phone} = req.body;

	user.name = params.name;
	user.surname = params.surname;
	user.idUser = params.idUser;
	user.email = params.email;
	user.password = params.password;
	user.phone = params.phone;
	
	
	const user_idExists = await User.findOne({idUser});

	if(user_idExists){
		res.status(400).send({message: 'El rut ya existe'} );
	}else{
		if(params.password != undefined){
		// Encriptar contraseña y guardar datos
		bcrypt.genSalt(saltRounds, function(err, salt) {
			bcrypt.hash(params.password,salt,function(err, hash){
				user.password = hash;
				if(user.name != null 
					&& user.surname != null
					&& user.idUser != null 
					&& user.email != null){
						// Guardar el user
						
							user.save((err, userStored) =>{
							if(err){
								res.status(500).send({message: 'Error al guardar el usuario'});
							}else{
								if(!userStored){
									res.status(404).send({message: 'No se ha registrado el usuario'});
						
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

	var idUser = params.idUser;
	var password = params.password;
   
    const user = await User.findOne({ idUser});


    if (user) {
    
      //Comprobamos la contraseña
			const check = await bcrypt.compare(password, user.password);
			
					if(check){
						//devolver los datos del user logeado
						if(params.gethash){
							//devolver un token de jwt
							response.status(200).send({
								token: jwt.createToken(user)
							});
						}else{
							response.status(200).send({user});
						}
					}else{
						response.status(404).send({message: 'login incorrect'});
					}
				
    } else {
      response.status(404).send({message: 'login incorrect'});
    }
  
};

/* 

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

}*/


module.exports = {
	loginUser,
	saveUser
	/* saveUser
	,
	updateUser,
	updateSaldo,
	getSaldo,
	getuser */
}