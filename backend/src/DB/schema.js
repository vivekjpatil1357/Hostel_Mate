const mongoose = require('mongoose');

const studentAuthSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String  },
    creationDateTime: { type: Date, default: Date.now },
});

const studentDetailsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        ref: 'Auth' // Reference to Auth schema
    },
    verificationStatus: { type: Boolean, default: false },
    roomNumber: { type: String, required: true },
    hostelId: { type: String, required: true, unique: true },
    hostelCardPhoto: { type: String, required: true },
    mobileNumber: { type: String, required: true },
});

const complaintSchema = new mongoose.Schema({
    complainType: { type: String, required: true }, // E.g., "Electricity", "Water", etc.
    description: { type: String, required: true },
    dateTime: { type: Date, default: Date.now },
    hostelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', // References the `Student` schema
        required: true
    },
    complainStatus: {
        type: String,
        enum: ['Pending', 'Resolved', 'In Progress'],
        default: 'Pending'
    }
});
const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    occupationRank: { type: String, required: true } // E.g., "Warden", "Assistant Warden"
});

const AdminModel = mongoose.model('Admin', adminSchema);
const StudentAuthModel = mongoose.model('StudentAuth', studentAuthSchema);
const StudentDetailsModel = mongoose.model('StudentDetails', studentDetailsSchema);
const ComplaintModel = mongoose.model('Complaint', complaintSchema);
module.exports = { AdminModel, ComplaintModel, StudentAuthModel, StudentDetailsModel };

