import React, { useEffect } from 'react'
import ComplaintRowHistory from './ComplaintRowHistory'

const GrievanceHistory = () => {
  const [complaints, setComplaints] = React.useState([])

  async function fetchGrievances() {
    await fetch('http://localhost:5000/getAllGrievances')
      .then((d) => d.json())
      .then((complaints) => {
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

  useEffect(() => {
    fetchGrievances()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-md border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left text-sm text-gray-600">Room Number</th>
              <th className="p-4 text-left text-sm text-gray-600 w-1/4">Name</th> {/* Increased width */}
              <th className="p-4 text-left text-sm text-gray-600">Type</th>
              <th className="p-4 text-left text-sm text-gray-600 w-1/4">Date</th> {/* Increased width */}
              <th className="p-4 text-left text-sm text-gray-600 w-1/4">Status</th> {/* Increased width */}
            </tr>
          </thead>
          <tbody>
            {
              complaints?.sort((a, b) => {
                return new Date(b.resolvedTime) - new Date(a.resolvedTime)
              }).map((item) => {
                return <ComplaintRowHistory key={item._id} data={item} />
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default GrievanceHistory
