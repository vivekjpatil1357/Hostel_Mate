import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const AdminDashboard = () => {
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const { uuid } = useParams()
    useEffect(() => {
        const check = () => {
            fetch('http://localhost:5000/getAdminById',
                {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        uuid
                    })
                }
            ).then((data) => data.json())
                .then((user) => {
                    console.log(user);
                    if (user.status) {
                        setUser(user.user)
                        return
                    }
                    else
                        navigate('login/admin')

                })
        }
        check()
    }, [])
    return (
        <div>{user?.email}</div>
    )
}

export default AdminDashboard