import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../config/firebase-config'
import Cookies from 'js-cookie'
import { signInWithPopup, signOut } from 'firebase/auth'
import { googleProvider } from '../../config/firebase-config'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../userContext/UserContextProvider'
import { signInWithEmailAndPassword } from 'firebase/auth'
const UserLogin = () => {
  const [user, setUser] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const set = useUserContext().setUser
  const navigate = useNavigate()
  
  useEffect(() => {
    function check() {
      if (auth.currentUser) {
        console.log("signin out");
        
        signOut(auth)
      }
    }
    check()
  },[])

  const handleLogin = (p) => {
    p.preventDefault()
    console.log(user);
    if (!user.email || user.email === '') {
      setErrors({ ...errors, email: 'Email is required' })

    }
    if (!user.password || user.password === '') {
      setErrors({ ...errors, password: 'Password is required' })

    }
    if (!user.email || user.email === '' || !user.password || user.password === '') {
      return
    }

    signInWithEmailAndPassword(auth, user.email, user.password)
      .then(async (userCredential) => {
        console.log(userCredential.user)
        console.log("storing cookie",userCredential.user);
        
        Cookies.set('user', JSON.stringify(userCredential.user), { expires: 7 })
        
        navigate('/verification')
      })
      .catch((error) => {
        setErrors({ ...errors, authError: 'Invalid email or password' })
      })
  }
  const handleGoogleSignIn = () => {
    var flag=false
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        console.log("storing cookie",result.user);
        
      Cookies.set('user',JSON.stringify(result.user),{expires:7})
      
      await fetch(`http://localhost:5000/isRegistered`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email:result.user.email
        })
      }).then((res) => res.json())
        .then((response) => {
          console.log("response from isRegister");
          console.log(response);
          console.log("response is up");
          
          if (response.status)
          {
            flag=true
            console.log("Navigating");
            navigate('/verification/requestPending')
            return
          }
          else {
            console.log("not registresed");
            navigate('/verification')
            return
          }
        })
      if (flag)
        return
        console.log("calling storeeeeee");
        if (result.user.metadata.creationTime === result.user.metadata.lastSignInTime)
        {
          
          fetch('http://localhost:5000/storeUserAuthInDb', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(
              {
                email: result.user.email,
                creatioDateTime: result.user.metadata.creationTime
              }
            )
          })
          .then((data) => data.json())
          .then((data) => {
            console.log("auth stored in db");
          }).catch((err) => {
            console.log("error ", err);
          })
        }
        console.log(result.user)
        navigate('/verification')
      }).catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="flex justify-center items-center  w-full bg-white">
      <form className="bg-blue-200 p-6 rounded-xl shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input className="w-full px-3 py-2 border rounded" type="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} name="email" id="email" />
        </div>
        {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input className="w-full px-3 py-2 border rounded" type="password" placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} name="password" id="password" />
        </div>
        {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
        {errors.authError && <p className="text-red-500 text-xs italic">{errors.authError}</p>}
        <input type="submit" value="Login" onClick={handleLogin} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" />
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