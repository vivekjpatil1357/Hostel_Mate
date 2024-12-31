const mongoose = require('mongoose');
require('dotenv').config()
const uri = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASS}@users.6llaz.mongodb.net/?retryWrites=true&w=majority&appName=Users`;
const connectDB = async () => {
    try {
        const connection=await mongoose.connect(uri);
        console.log('DB Connected...');
        return connection;
    } catch (error) {
        console.log("Connection problem");
    }
}
const db = connectDB()

module.exports = db
