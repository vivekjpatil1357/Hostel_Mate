const express = require('express');
const router = express.Router();

const storeInDb = (req, res) => {
    const user = req.body;
    console.log(user);
    res.json({ message: "User stored in DB" })
};

module.exports = {storeInDb}