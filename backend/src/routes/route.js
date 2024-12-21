const express = require('express');
const { storeInDb } = require('../controllers/userController');
const router = express.Router();
router.post('/storeUserInDb', storeInDb);

module.exports = router;