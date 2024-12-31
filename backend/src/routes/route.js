const express = require('express');
const { storeUserAuthInDb, storeUserDetailsInDb, uploadId, userByEmail, userById, isRegistered, isValidHostelId, isVerified, getAllUsers, getImage, userVerify } = require('../controllers/userController');
const { storeAdminInDb, authAdminInDb, adminById } = require('../controllers/adminController');
const multer = require('multer');
const path = require('path')
const fs=require('fs')
const axios=require('axios');
const { getAllComplaints } = require('../DB/complaint');
const { allComplaints, newComplaint } = require('../controllers/complaintController');

const router = express.Router();
// Set up Multer for file uploads
const upload = multer({ dest: 'uploads/',storage:multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

router.post('/storeUserAuthInDb', storeUserAuthInDb);
router.post('/storeUserDetailsInDb', storeUserDetailsInDb);
router.post('/uploadId/:uuid', upload.single('image'),uploadId)
router.post('/isRegistered',isRegistered)
router.post('/getUserByEmail', userByEmail)
router.post('/getUserById', userById)
router.post('/isValidHostelId', isValidHostelId)
router.post('/isUserVerified', isVerified)
router.get('/getAllUserDetails', getAllUsers)
router.post('/getImageUrl', getImage)
router.post('/setVerified',userVerify)


router.post('/storeAdminInDb', storeAdminInDb)
router.post('/authAdminInDb', authAdminInDb)
router.post('/getAdminById', adminById)


router.get('/getAllGrievances', allComplaints)
router.post('/newComplaint',newComplaint)
// router.post')



module.exports = router;
