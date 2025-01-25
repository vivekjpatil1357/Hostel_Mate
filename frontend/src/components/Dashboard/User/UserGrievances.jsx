import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import UserComplaintRow from './UserComplaintRow'
const UserGrievances = () => {
    const [complaints, setComplaints] = useState([])
    // const { uuid } = useParams()
    const [user, setUser] = useState()
    const navigate = useNavigate()
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
                    return complaint.complaintStatus=== 'Pending' || complaint.complaintStatus=== 'In Progress';
                }))
            }).catch((error) => {
                console.log(error);
            })
        }
        
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
    const refresh=()=>{fetchGrievances(user)}
    return (
        <div className="p-4 w-full">
        <div className="overflow-x-auto bg-white shadow-md rounded-md p-4 border border-gray-300">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-center font-semibold text-gray-800">
                <th className="p-4">Type</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Update Status</th>
              </tr>
            </thead>
            <tbody>
              {complaints?.map((complaint) => (
                <UserComplaintRow key={complaint._id} data={complaint} refresh={refresh} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    )
}
export default UserGrievances