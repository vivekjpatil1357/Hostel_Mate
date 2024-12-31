import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
const UserDashboard = () => {
  const [user,setUser]=useState()
  const navigate=useNavigate()
  useEffect(() => {
    const c=JSON.parse(Cookies.get('user'))
    if (c) {
      setUser(c)
    }
    else {
      navigate('/')
    }
  },[])
  return (
    <div>{ user&&(user.displayName?user.displayName:user.email)}</div>
  )
}

export default UserDashboard