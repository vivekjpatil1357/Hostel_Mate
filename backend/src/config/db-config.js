const mongoose = require('mongoose');
const uri = "mongodb+srv://vivekjpatil1357:qjm7HUsSGZO0NV5e@users.6llaz.mongodb.net/?retryWrites=true&w=majority&appName=Users";
const connectDB = async() => {
    const connection=await mongoose.connect(uri);
    console.log('DB Connected...');
    return connection;
}
module.exports=connectDB