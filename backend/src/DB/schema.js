const mongoose = require('mongoose');

const studentAuthSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String },
    creationDateTime: { type: Date, default: Date.now },
});

const studentDetailsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        ref: 'StudentAuth'
    },
    verificationStatus: { type: Boolean, default: false },
    roomNumber: { type: String, required: true },
    hostelId: { type: String, required: true, unique: true },
    hostelCardPhoto: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    requestTime: { type: Date, default: Date.now }
});

const complaintSchema = new mongoose.Schema({
    complaintType: { type: String, required: true },
    description: { type: String, required: true },
    dateTime: { type: Date, default: Date.now },
    resolvedTime: { type: Date },
    hostelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudentDetails',
        required: true
    },
    complaintStatus: {
        type: String,
        enum: ['Pending', 'Resolved', 'In Progress','Discard'],
        default: 'Pending'
    }
});
const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rank: { type: String, required: true },
    creationTime: { type: Date, default: Date.now }
});
const AdminModel = mongoose.model('Admin', adminSchema);
const StudentAuthModel = mongoose.model('StudentAuth', studentAuthSchema);
const StudentDetailsModel = mongoose.model('StudentDetails', studentDetailsSchema);
const ComplaintModel = mongoose.model('Complaint', complaintSchema);
module.exports = { AdminModel, ComplaintModel, StudentAuthModel, StudentDetailsModel };
