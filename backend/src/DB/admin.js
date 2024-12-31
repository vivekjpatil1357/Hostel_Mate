const mongoose = require('mongoose');
const { AdminModel } = require('./schema');

const getAllAdmins = async (db) => {
    const admins = await AdminModel.find();
    return admins;
}

const createAdmin = async (db, adminData) => {
    console.log("inside createAdmin");
    const newAdmin = new AdminModel(adminData);
    var res={}
    result = await newAdmin.save()
        .then((user) => {
        res={status:true,user}
        })
        .catch((err) => {

        res={status:false,error:err.code==11000?"email is already in use":"other than email problem"}
    })
    return res
}

const getAdminById = async (uuid) => {
    const admin = await AdminModel.findById(uuid)
    return admin
}

const authAdmin = async ( email,password) => {
    const admin = await AdminModel.findOne({ email }); 
    
    if (!admin) {
        return { auth: false, message: "Admin not found" };
    }
    if (admin.password === password) {
        return { auth: true, user:admin };
    }
    return { auth: false, message: "invalid password" };
}
module.exports = { createAdmin, getAllAdmins,getAdminById, authAdmin }
