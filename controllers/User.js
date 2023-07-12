'user strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt');
var User = require('../models/user');
var LoginAttempt = require('../models/loginAttempts');
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
	var password = params.password;
   	
	// validamos el usuario con el email
    const user = await User.findOne({email: params.email});
	
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



const loginRegister = async (request, response, next) => {
 
	var params = request.body;
   var password = params.password;
	  
   // validamos el usuario con el email
   const user = await User.findOne({email: params.email});
   let exitosoaux ;
   if (user) {	 //Comprobamos la contraseña
		   const check = await bcrypt.compare(password, user.password);
		  
		   if(user){
				this.exitosoaux = true;
			}else{
				this.exitosoaux = false;
			}  
					const nuevoIntento  = new LoginAttempt({
						name: user.name,
						surname: user.surname,
						usuario: user.idUser,
						exitoso: this.exitosoaux
						 // Cambia esto según el resultado del intento de inicio de sesión
					  });
					 
					   nuevoIntento.save().then(() => {
							response.status(200).send({message: 'Registro de intento de inicio de sesión guardado'});
						    console.log('Registro de intento de inicio de sesión guardado');
						 }).catch((error) => {
							response.status(404).send({message: 'Error al guardar el registro de intento de inicio de sesión'});
						    console.error('Error al guardar el registro de intento de inicio de sesión:', error);
						 });		
								
			   
   }
};




module.exports = {
	loginUser,
	saveUser,
	loginRegister
}