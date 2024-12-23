const express = require('express');
const router = express.Router();
const { createUserAuth } = require('../DB/db');
const connectDB = require('../config/db-config');
const db=connectDB();
const storeInDb = async(req, res) => {
    const user = req.body;
    if (!user) {
        return res.status(400).json({ message: "Invalid data" });
    }
    const newUser={
        email :user.email,
        password :user.password,
        creationTime :new Date()
    }
    await createUserAuth(db,newUser)
    res.json({ message: "User stored in DB" })
};

module.exports = {storeInDb}