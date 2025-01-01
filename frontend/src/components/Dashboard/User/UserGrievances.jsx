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
        <div>
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
                    <div className={`flex items-center px-2 py-1 rounded-md`}>
                        <p className="text-base">Status</p>
                    </div>
                </div>
                <div className="flex-1 flex items-start justify-center">
                    <div className={`flex items-center px-2 py-1 rounded-md`}>
                        <p className="text-base">Update Status</p>
                    </div>
                </div>
            </div>
                {complaints?.map((complaint) => {

                    return <UserComplaintRow key={complaint._id} data={complaint} refresh={refresh} />

                })}
        </div>
    )
}
export default UserGrievances