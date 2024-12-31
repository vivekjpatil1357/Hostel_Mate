const { getAllComplaints } = require("../DB/complaint")
// const { ComplaintModel } = require("../DB/schema")

const allComplaints = async(req,res) => {
    await getAllComplaints().then((complaints) => {
        console.log(complaints);
        
        return res.json({ status: true, complaints })
        
    })
        .catch((error) => {
        return res.json({status:false,error})
    })
}
const newComplaint = async(req, res) => {
    const {complaintData}=req.body
}
module.exports={allComplaints,newComplaint}
