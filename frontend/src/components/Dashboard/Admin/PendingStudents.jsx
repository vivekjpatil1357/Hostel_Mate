import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import StudentVerificationRow from '../../StudentVerificationRow'

const PendingStudents = () => {
  const {uuid}=useParams()
  const [admin,setAdmin]=useState()
  const [users,setUsers]=useState([])
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
  const getUsers = () => {
    fetch('http://localhost:5000/getAllUserDetails')
      .then((data) => data.json())
      .then((users) => {
        console.log("fetichig",users);
        
        setUsers(users.users.filter((item) => {
        return item.verificationStatus===false
      }))
    })
  }
  useEffect(() => {
    isAdmin()
    getUsers()
    console.log("hello");
 
  },[])
  return (
    <div className=''>
      <div className="mb-3 grid grid-cols-7 items-center bg-white shadow-md rounded-md p-4 border border-gray-300 gap-4">
            <div className="text-center">
                <p className="text-base text-gray-800 font-medium truncate">Name</p>
            </div>


            <div className="text-center">
                <p className="text-base text-gray-800 font-medium truncate">Mobile Number</p>
            </div>

            <div className="text-center">
                <p className="text-base text-gray-800 font-medium truncate">Room Number</p>
            </div>

            <div className="text-center">
                <p className="text-base text-gray-800 font-medium truncate">Hostel ID</p>
            </div>

            <div className="text-center">
                <p className="text-base text-gray-800 font-medium truncate">Time</p>
            </div>



            <div className="text-center">
                <button

                >
                    Status
                </button>
            </div>

            <div className="text-center">
                
            </div>

            
        </div>
      {
        users?.map((item) => 
        
        <div key={item._id}><StudentVerificationRow user={item} /></div>  )
      }
    </div>
  )
}

export default PendingStudents