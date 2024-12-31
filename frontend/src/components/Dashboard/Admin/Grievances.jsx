import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import ComplaintRow from '../../ComplaintRow'

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

                setComplaints(complaints.complaints)
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
    return (
        <div>
            {admin?.name}
            {
                complaints?.map((item) => {
                    return <ComplaintRow key={item._id} data={item} />
                })
            }
        </div>
    )
}

export default Grievances