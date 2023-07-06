'user strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt');
var Account = require('../models/account');
var User = require('../models/user');
var jwt = require('../service/jwt');


const saltRounds = 10;

const saveBalance = async(req,res) => {
	var account = new Account();

	var params = req.body;
	const {idAccount, idUser, accountBalance} = req.body;
   
	account.idAccount = params.idAccount;
	account.idUser = params.idUser;
	account.accountBalance = params.accountBalance;
	
    const userValid =  await User.findOne({idUser:  account.idUser});
    //Tarjeta.findById(tarjetaId).populate({path:'tipo_cuenta', select: 'tipo_cuenta'})
    const existeTarjetaYusuario = await Account.findOne({idAccount:  account.idAccount});
   

	if(existeTarjetaYusuario && userValid){
		res.status(400).send({message: 'La tarjeta y el usuario ya estan asignados'} );
	}else{		
		// Encriptar contraseña y guardar datos	
		
				if(account.idAccount != null 
					&&  account.idUser != null 
					&&  account.accountBalance != null ){	
                        
                        console.log(params.idAccount);
                        console.log(params.idUser);
                        console.log(params.accountBalance);
						
                        account.save((err, accountStored) =>{
							if(err){
								res.status(500).send({message: 'Error al guardar la tarjeta'});
							}else{
								if(!accountStored){
									res.status(404).send({message: 'No se ha registrado la tarjeta'});
						
								}else{
									res.status(200).send({account: accountStored});
						
								}
				
							}
							});
						
						
				}else{
					res.status(200).send({message: 'Rellena los campos requeridos'});
				}
	}
}

function balance(req, res){
	// BODY PARSE LO CONVIERTE A OBJETO JSON
    var params = req.body;
 
	Account.findOne({idUser:params.idUser}, (err, account) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!account){
				res.status(404).send({message: 'El usuario no existe'});
			}else{	
				let accountBalance = account.accountBalance;
				res.status(200).send({accountBalance});				
			}

		}
	});		

}


module.exports = {
	balance,
    saveBalance
	/* saveUser
	,
	updateUser,
	updateSaldo,
	getSaldo,
	getuser */
}