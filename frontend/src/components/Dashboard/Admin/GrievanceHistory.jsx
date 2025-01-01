import React, { useEffect } from 'react'
import ComplaintRowHistory from './ComplaintRowHistory'

const GrievanceHistory = () => {
  const [complaints, setComplaints] = React.useState([])

  async function fetchGrievances() {
    await fetch('http://localhost:5000/getAllGrievances')
      .then((d) => d.json())
      .then((complaints) => {
        console.log(complaints)
        setComplaints(
          complaints.complaints.filter((complaint) => {
            return (
              complaint.complaintStatus === 'Discard' ||
              complaint.complaintStatus === 'Resolved'
            )
          })
        )
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const refresh = () => {
    fetchGrievances()
  }

  useEffect(() => {
    fetchGrievances()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <div className="min-w-full bg-white shadow-md rounded-md p-4 border border-gray-300">
          <div className="hidden sm:grid grid-cols-5 gap-4 text-center">
            <p className="text-base text-gray-800">Room Number</p>
            <p className="text-base text-gray-800">Name</p>
            <p className="text-base text-gray-800">Type</p>
            <p className="text-base text-gray-800">Date</p>
            <p className="text-base text-gray-800">Status</p>
          </div>
        </div>
        {complaints?.map((item) => {
          return <ComplaintRowHistory key={item._id} data={item} />
        })}
      </div>
    </div>
  )
}

export default GrievanceHistory
