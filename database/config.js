const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const dbConnection = async() => {
    
    try{
        mongoose.set('strictQuery', false);
        mongoose.Promise = global.Promise;
        await mongoose.connect('mongodb+srv://victorurquiolaestroz:K5iPQfT5WmdPcSj5@cluster0.ttnh0el.mongodb.net/desafiochek?retryWrites=true', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Conected...');
    }catch (err){
        console.error(err.message);
        // make the process fail
        process.exit(1);
    }
    

}


module.exports = {dbConnection};