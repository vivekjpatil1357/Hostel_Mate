const db = require('../config/db-config')
const { createAdmin, getAllAdmins, authAdmin, getAdminById } = require('../DB/admin')

const authAdminInDb = async (req, res) => {
    const {email,password}=req.body
    const result = await authAdmin(email,password)
    return res.json(result)
}

const storeAdminInDb = async (req, res) => {
    const admin = req.body
    console.log("inside storeadminindb");
    if (!admin) {
        return res.json({ message: "Emty admin" })
    }
    const newAdmin = {
        ...admin,
        creationTime: new Date()
    }
    const result = await createAdmin(db, newAdmin)
    return res.json(result)
    

}

const adminById = async (req, res) => {
    const { uuid } = req.body
    console.log(uuid);
    
    getAdminById(uuid).then((user) => {
        console.log(user);
        if(user)
        return res.json({ status: true, admin:user})
      return res.json({ status:false})
      
    }).catch((error) => {
      return res.json({status:false,error})
    })
  }

module.exports = { storeAdminInDb,adminById,authAdminInDb }