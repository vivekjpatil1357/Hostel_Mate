import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../userContext/UserContextProvider';
import { auth } from '../../config/firebase-config';
import Cookies from 'js-cookie';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { googleProvider } from '../../config/firebase-config';

const UserRegister = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [errors, setErrors] = React.useState({});
    const [user, setUser] = useState()
    const navigate = useNavigate()

    const sendToDatabase = (user) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                fetch('http://localhost:5000/storeUserAuthInDb', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user ? {
                        email: user.email,
                        creationDateTime: user.metadata.creationTime,
                    } : {
                        email: email,
                        password: password
                    })
                }
                ).then((response) =>
                    response.json()
                )
                    .then((data) => {
                        console.log(data)
                        if(data.status)
                        {
                            Cookies.set('user',data.user,{expires:7})
                            navigate('/verification')
                            
                        }
                        else {
                            setErrors({email:data.error.errorResponse})
                        }

                    }).catch((error) => {
                        console.log("enable to send data to database", error.message)
                    })
            }
            )
            .catch((error) => {
                setErrors({ email: "email already in use" })
            })
    }
    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                setUser(result.user)
                console.log(result.user);
                if(result.user.metadata.creationTime===result.user.metadata.lastSignInTime)
                {
                    sendToDatabase(result.user)
                    navigate('/verification')
                }
                else {
                    fetch(`http://localhost:5000/isRegistered`, {
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
                          if (response.status)
                          {      
                            console.log("Navigating");
                            navigate('/verification/requestPending')
                            return
                          }
                        })
                }
            }).catch((error) => {
                console.log("kuch gadbad hai")
            })
    }
    const validate = () => {
        const newErrors = {};
        if (!email.includes('@')) {
            newErrors.email = 'Invalid email address';
        }
        if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            sendToDatabase()
        }
    };

    return (
        <div className="flex flex-col justify-center items-center bg-gray-100 w-screen">
            <div className="mb-4">
                <h1 className="text-3xl font-semibold text-gray-800">Register User</h1>
            </div>
            <form className="bg-white p-6 rounded shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div className="mb-4 relative">
                    <label className="block text-gray-700">Password:</label>
                    <div className="flex items-center">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 p-2 w-full border rounded"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-2 px-3 py-2 bg-gray-200 rounded">
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                <div className="mb-4 relative">
                    <label className="block text-gray-700">Confirm Password:</label>
                    <div className="flex items-center">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="mt-1 p-2 w-full border rounded"
                        />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="ml-2 px-3 py-2 bg-gray-200 rounded">
                            {showConfirmPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Register
                </button>
                <button type="button" onClick={() => handleGoogleSignIn()} className="w-full mt-4 bg-red-500 text-white py-2 rounded hover:bg-red-600">
                    SignIn with Google
                </button>
            </form>
        </div>
    );
}

export default UserRegister