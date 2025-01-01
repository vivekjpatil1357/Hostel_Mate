import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import ComplaintRow from './ComplaintRow'

const Grievances = () => {
    const [complaints, setComplaints] = useState([])
    const { uuid } = useParams()
    const [admin, setAdmin] = useState()
    const navigate=useNavigate()
    async function fetchGrievances() {
        await fetch('http://localhost:5000/getAllGrievances')
            .then((d) => d.json())
            .then((complaints) => {
                console.log(complaints);
                setComplaints(complaints.complaints.filter((complaint) => {
                  return complaint.complaintStatus!=='Discard' && complaint.complaintStatus!=='Resolved';
              }))
            }).catch((error) => {
                console.log(error);
            })
    }
    const isAdmin = () => {
        fetch('http://localhost:5000/getAdminById', {
            method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uuid
      })
        }).then((d) => d.json())
            .then((admin) => {
                if (admin.status) {
                setAdmin(admin.admin)
                }
                else {
                    console.log("admin not found");
                    navigate('/login/admin')
                }
        })
    }
    useEffect(() => {
        fetchGrievances()
        isAdmin()
    }, [])
  const refresh = () => {
    fetchGrievances()
  }
    return (
        <div>
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
        <div className={`flex items-center px-2 py-1 rounded-md`}>
          <p className="text-base">Status</p>
        </div>
      </div>
      <div className="flex-1 flex items-start justify-center">
        <div className={`flex items-center px-2 py-1 rounded-md`}>
          <p className="text-base">Change Status</p>
        </div>
      </div>
    </div>
            {/* {admin?.name} */}
            {
                complaints?.map((item) => {

                    return <ComplaintRow key={item._id} data={item} refresh={refresh} />
                })
            }
        </div>
    )
}

export default Grievances