const mongoose = require('mongoose');

const databaseConection = async () => { 
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('db_online');
    } catch (error) {
        console.log(error);
        throw new Error('Error while init database');
    }
} 
module.exports = { databaseConection };