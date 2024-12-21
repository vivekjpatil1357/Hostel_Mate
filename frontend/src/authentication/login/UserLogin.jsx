import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../config/firebase-config'
import { signInWithPopup } from 'firebase/auth'
import { googleProvider } from '../../config/firebase-config'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../userContext/UserContextProvider'
const UserLogin = () => {
  // const [user, setUser] = useState()
  const set=useUserContext().setUser
  const navigate = useNavigate()
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result.user);
        set(result.user)

        navigate('/verification')

      }).catch((error) => {
        console.log(error)
      })
  }
  // useEffect(() => {
  //   if (user)
  //   console.log(user.tokenResponse.expiresIn)
  // }, [user])
  return (

    <div className="flex justify-center items-center  w-full bg-white">
      <form className="bg-blue-200 p-6 rounded-xl shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <div className="mb-4">
          <label htmlFor="userId" className="block text-gray-700">Hostel ID</label>
          <input className="w-full px-3 py-2 border rounded" type="text" placeholder="Hostel ID" name="userId" id="userId" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input className="w-full px-3 py-2 border rounded" type="email" placeholder="Email" name="email" id="email" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input className="w-full px-3 py-2 border rounded" type="password" placeholder="Password" name="password" id="password" />
        </div>
        <input type="submit" value="Login" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" />
        <button type="button" onClick={handleGoogleSignIn} className="w-full mt-4 bg-red-500 text-white py-2 rounded hover:bg-red-600">
          Continue with Google
        </button>
        <div className="mt-4 text-center">
          New to app? <Link to='/register/user'>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
              Register
            </button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default UserLogin