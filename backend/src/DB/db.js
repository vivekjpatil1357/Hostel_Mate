const mongoose = require('mongoose');
const {StudentAuthModel,StudentDetailsModel,ComplaintModel,AdminModel} = require('./Schema');


const createUserAuth = async (db, userData) => {
    const newUser = new StudentAuthModel(userData);
    await newUser.save().then(() => {
        console.log('User Auth Created');
    }).catch((error) => {
        console.log(error);
    });

}   
module.exports = {createUserAuth}
