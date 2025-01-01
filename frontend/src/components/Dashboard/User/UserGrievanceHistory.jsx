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
    <div><div>
      <div className="flex items-center justify-around bg-white shadow-md rounded-md p-4 border border-gray-300">
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
      {
        complaints?.map((item) => {
          return <UserComplaintRowHistory key={item._id} data={item} />
        })
      }
    </div>
    </div>
  )
}

export default UserGrievanceHistory