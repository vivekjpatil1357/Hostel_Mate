const { getAllComplaints, createComplaint, updateComplaintStatus } = require("../DB/complaint")

const allComplaints = async (req, res) => {
    await getAllComplaints().then((complaints) => {
        console.log(complaints);
        complaints=complaints.reverse()
        return res.json({ status: true, complaints })

    })
        .catch((error) => {
            return res.json({ status: false, error })
        })
}
const setComplaintStatus = async (req, res) => {
    const {id,status,resolvedTime}= req.body
    console.log(id,status);
    const result = await updateComplaintStatus(id, status,resolvedTime)
    if (result) {
        return res.json({ status: true, complaint: result })
    }
    return res.json({ status: false, message: "Error in updating status" })
}
const getComplaintById = async (req, res) => {
    const id = req.body.id
    const complaints = await getAllComplaints()
    if (complaints) {
        
        return res.json({
            status: true,
            complaints: ((complaints.filter((complaint) => {
                return complaint.hostelId._id == id
            }
            ).reverse()))
        }
        )
    }
    return res.json({ status: false, message: "Error in fetching complaints" })
}
const newComplaint = async (req, res) => {
    const complaintData = req.body
    console.log(complaintData);
    const newC = await createComplaint(complaintData)
    if (newC) {
        return res.json({ status: true, newC })
    }
    return res.json({ status: false, message: "Error in creating complaint" })
}
module.exports = { allComplaints, newComplaint,setComplaintStatus ,getComplaintById}
