const mongoose = require('mongoose');
const {  ComplaintModel } = require('./schema');

const getAllComplaints = async () => {
    try {
        
        const complaints = await ComplaintModel.find()
        .populate('hostelId', 'hostelId name')
        .exec()
        console.log("herer i am",complaints);
        return complaints
    } catch (error) {
        console.log(error);
        return []
    }
    
}


const createComplaint = async (db, complaintData) => {
    const newComplaint = new ComplaintModel(complaintData);
    await newComplaint.save().then(() => {
        console.log('Complaint Created');
    }).catch((error) => {
        console.log(error);
    });
}

const deleteComplaint = async (db, complaintData) => {
    const complaint = await complaintModel.findOne({ email: complaintData.email });
    if (!complaint) {
        return { auth: false, message: "Complaint not found" };
    }
    await complaint
        .deleteOne()
        .then(() => {
            console.log('Complaint Deleted');
            return { auth: true, message: "Complaint deleted" };
        })
        .catch((error) => {
            console.log(error);
            return { auth: false, message: "Error deleting complaint" };
        });
}

module.exports = { createComplaint, getAllComplaints }
