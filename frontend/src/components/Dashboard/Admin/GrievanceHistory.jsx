import React, { useEffect } from 'react'
import ComplaintRow from './ComplaintRow'
import ComplaintRowHistory from './ComplaintRowHistory'
const GrievanceHistory = () => {
  const [complaints, setComplaints] = React.useState([])
  async function fetchGrievances() {
    await fetch('http://localhost:5000/getAllGrievances')
        .then((d) => d.json())
        .then((complaints) => {
            console.log(complaints);
            setComplaints(complaints.complaints.filter((complaint) => {
              return complaint.complaintStatus=='Discard' || complaint.complaintStatus=='Resolved';
          }))
        }).catch((error) => {
            console.log(error);
        })
  }
  const refresh = () => {fetchGrievances()}
  useEffect(() => {
    fetchGrievances()
  }, [])
  return (
    <div><div>
      <div className="flex items-center justify-around bg-white shadow-md rounded-md p-4 border border-gray-300">
        <div className="flex-1 flex items-start justify-center">
          <p className="text-base text-gray-800">Room Number</p>
        </div>
        <div className="flex-1 flex items-start justify-center">
          <p className="text-base text-gray-800">Name</p>
        </div>
        <div className="flex-1 flex items-start justify-center">
          <p className="text-base text-gray-800">Type</p>
        </div>


        <div className="flex-1 flex items-start justify-center">
          <p className="text-base text-gray-800">
            Date
          </p>
        </div>
        <div className="flex-1 flex items-start justify-center">
          <p className="text-base text-gray-800">
            Status
          </p>
        </div>


        
      </div>
      {/* {admin?.name} */}
      {
        complaints?.map((item) => {

          return <ComplaintRowHistory key={item._id} data={item} />
        })
      }
    </div>
    </div>
  )
}

export default GrievanceHistory