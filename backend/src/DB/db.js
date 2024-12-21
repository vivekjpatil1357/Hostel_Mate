const mongoose = require('mongoose');
const {StudentAuthModel,StudentDetailsModel,ComplaintModel,AdminModel} = require('./Schema');
const createUserAuth=async (db,userData)=>{
    const newUser = new StudentAuthModel(userData);
    await newUser.save();
}   
module.exports = {createUserAuth}
