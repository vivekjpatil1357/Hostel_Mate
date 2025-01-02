import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import 'tailwindcss/tailwind.css'

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
                        setUser(user.admin)
                        return
                    }
                    else
                        navigate('login/admin')

                })
        }
        check()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
                <p className="text-lg">Email: {user?.name}</p>
            </div>
        </div>
    )
}

export default AdminDashboard