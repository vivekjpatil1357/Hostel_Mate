import React, { useEffect } from 'react'
import ComplaintRowHistory from '../Admin/ComplaintRowHistory'
import Cookies from 'js-cookie'
import UserComplaintRowHistory from './UserComplaintRowHistory'
const UserGrievanceHistory = () => {
  const [complaints, setComplaints] = React.useState([])
  const [user, setUser] = React.useState()

  async function fetchGrievances(c) {
    console.log(user);
    await fetch('http://localhost:5000/userGrievanceById', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: c._id
      })
    })
      .then((d) => d.json())
      .then((complaints) => {
        console.log(complaints);
        setComplaints(complaints.complaints.filter((complaint) => {
          return complaint.complaintStatus === 'Resolved' || complaint.complaintStatus === 'Discard';
        }))
      }).catch((error) => {
        console.log(error);
      })
  }
  // const refresh = () => {fetchGrievances()}
  useEffect(() => {
    const c = JSON.parse(Cookies.get('user'))
    if (c) {
      setUser(c)
      console.log("user found");
    }
    else {
      alert('login firset')
      navigate('/login/user')
    }
    fetchGrievances(c)
  }, [])

  return (
    <div className="p-4 w-full">
    <div className="overflow-x-auto bg-white shadow-md rounded-md p-4 border border-gray-300">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100 text-center font-semibold text-gray-800">
            <th className="p-4">Type</th>
            <th className="p-4">Date</th>
            <th className="px-20 py-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {complaints?.map((item) => (
            <UserComplaintRowHistory key={item._id} data={item} />
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
  )
}

export default UserGrievanceHistory