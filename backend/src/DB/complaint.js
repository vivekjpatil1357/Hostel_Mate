const mongoose = require('mongoose');
const {  ComplaintModel } = require('./schema');

const getAllComplaints = async () => {
    try {
        
        const complaints = (await ComplaintModel.find()
        .populate('hostelId', '_id hostelId name roomNumber')
        .exec())
        // console.log("herer i am",complaints);
        return complaints
    } catch (error) {
        console.log(error);
        return []
    }
    
}

const updateComplaintStatus = async (id, status,resolvedTime) => {
    try {
        const complaint = await ComplaintModel.findByIdAndUpdate(id,{$set:{ complaintStatus: status,resolvedTime:resolvedTime }}, { new: true })
        return complaint
    }
    catch (error) {
        console.log(error);
        return null
    }
}

const createComplaint = async (complaintData) => {
    console.log("complaintData",complaintData);
    const newComplaint = new ComplaintModel(complaintData);
    try {
        const complaint = await newComplaint.save()
        return complaint
    } catch (error) {
        console.log("error in creating complaint",error);
    }
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

module.exports = { createComplaint,updateComplaintStatus, getAllComplaints }
