const mongoose = require('mongoose');
const env = require('../../env');
const uri = `mongodb+srv://${env.ATLAS_USERNAME}:${env.ATLAS_PASS}@users.6llaz.mongodb.net/?retryWrites=true&w=majority&appName=Users`;
const connectDB = async() => {
    const connection=await mongoose.connect(uri);
    console.log('DB Connected...');
    return connection;
}

module.exports=connectDB