import React, { useEffect, useState } from 'react'
import { auth } from '../config/firebase-config'
import { Navigate, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
// import { use } from 'react'

const PendingVerification = () => {
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState()
  //get user
  const check = () => {
    if (!auth.currentUser) {
      console.log("current user");
      console.log(auth.currentUser);

      navigate("/login/user")
      return false
    }
    else {
      // setUser(auth.currentUser)
      console.log("user");
      return true
    }
  }

  //if user is verified
  const isVerified = () => {
    console.log("Verfication for registered or not");
    fetch('http://localhost:5000/isUserVerified', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: auth.currentUser.email
      })
    }).then((data) => data.json())
      .then((data) => {
        console.log("resonse fron isVerife", data);

        if (data.status)
        {
          console.log("navigaint to user dash");
          Cookies.set('user', JSON.stringify(data.user), { expires:7})
          navigate(`/dashboard/user/${data.user._id}`)
        }
      })
      .catch((error) => {
        console.log("error in isVerified", error);
      })
  }
  useEffect(() => {
    const c = JSON.parse(Cookies.get('user'))
    setTimeout(() => {
      if (!c) {
        navigate("/login/user")
        return
      }

      isVerified()
        
    }, 500)



  }, [])
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <h1 className="text-gray-900 font-bold text-2xl">Pending Verification</h1>
        <p className="text-gray-600 mt-2">Your request is pending for verification. Please wait for the confirmation.</p>
      </div>
    </div>
  )
}

export default PendingVerification