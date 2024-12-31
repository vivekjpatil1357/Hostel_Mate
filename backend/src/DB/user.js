const mongoose = require('mongoose');
const { StudentAuthModel, StudentDetailsModel } = require('./schema');

const getAllUsersAuth = async (db) => {
    const users = await StudentAuthModel.find();
    return users;
}

const getAllUsersDetails = async (db) => {
    const users = await StudentDetailsModel.find();
    return users;
}
const getUserById = async (uuid) => {
    const user = await StudentAuthModel.findById(uuid)
    return user

}

const getUserByEmail = async (email) => {
    const user = await StudentAuthModel.findOne({ email: email })
    return user
}
const getUserDetailsByEmail = async (email) => {
    const user = await StudentDetailsModel.findOne({ email: email })
    return user
}


const createUserDetails = async (db, userData) => {
    const newUser = new StudentDetailsModel(userData);
    var res = {}
    await newUser.save().then((user) => {
        res = { status: true, user }
    })
        .catch((error) => {
            res = { status: false, error }
        })
    return res
}

const updateToVerify = async (id) => {
    try {
        const user = await StudentDetailsModel.findByIdAndUpdate(id, { $set: { verificationStatus: true } }, { new: true })
        console.log(user);
        return user

    }
    catch (error) {
       console.log("error in up",error);
    }
}

const isEmailExist = async (email) => {
    console.log(email);

    const user = await StudentDetailsModel.findOne({ email })
    return user
}
const isHostelIdExist = async (hostelId) => {
    const user = await StudentDetailsModel.findOne({ hostelId })
    return user
}

const createUserAuth = async (db, userData) => {
    const newUser = new StudentAuthModel(userData);
    await newUser.save().then(() => {
        console.log('User Auth Created');
    }).catch((error) => {
        console.log(error);
    });
    
}


module.exports = { createUserAuth,updateToVerify,getUserDetailsByEmail, isHostelIdExist, createUserDetails, getUserById, getAllUsersAuth, getUserByEmail, getAllUsersDetails, isEmailExist }
