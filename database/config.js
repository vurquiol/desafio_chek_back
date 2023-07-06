const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const dbConnection = async() => {
    
    try{
        await mongoose.connect(process.env.DB_CNN);
        console.log('MongoDB Conected...');
    }catch (error){
        console.log(error);
    }
    

}


module.exports = {dbConnection};