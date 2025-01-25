import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase-config';
import Cookies from 'js-cookie';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { googleProvider } from '../../config/firebase-config';
import { motion } from 'framer-motion';

const UserRegister = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const sendToDatabase = (user) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                fetch('http://localhost:5000/storeUserAuthInDb', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        user
                            ? {
                                  email: user.email,
                                  creationDateTime: user.metadata.creationTime,
                              }
                            : {
                                  email: email,
                                  password: password,
                              }
                    ),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        if (data.status) {
                            Cookies.set('user', data.user, { expires: 7 });
                            navigate('/verification');
                        } else {
                            setErrors({ email: data.error.errorResponse });
                        }
                    })
                    .catch((error) => {
                        console.log('Unable to send data to database', error.message);
                    });
            })
            .catch(() => {
                setErrors({ email: 'Email already in use' });
            });
    };

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                if (user.metadata.creationTime === user.metadata.lastSignInTime) {
                    sendToDatabase(user);
                    navigate('/verification');
                } else {
                    fetch('http://localhost:5000/isRegistered', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email: user.email }),
                    })
                        .then((res) => res.json())
                        .then((response) => {
                            if (response.status) {
                                navigate('/verification/requestPending');
                            }
                        });
                }
            })
            .catch(() => {
                console.log('An error occurred');
            });
    };

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
            sendToDatabase();
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="flex flex-col justify-center items-center bg-gradient-to-r from-blue-300 to-blue-500 w-screen min-h-screen"
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded shadow-md w-full max-w-md"
            >
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Register User</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password:</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-2 px-3 py-2 bg-gray-200 rounded"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Confirm Password:</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-1 p-3 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-2 top-2 px-3 py-2 bg-gray-200 rounded"
                            >
                                {showConfirmPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-300"
                    >
                        Register
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full mt-4 bg-red-500 text-white py-3 rounded hover:bg-red-600 transition duration-300"
                    >
                        Sign In with Google
                    </motion.button>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default UserRegister;
