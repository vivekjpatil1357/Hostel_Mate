import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../../config/firebase-config';
import Cookies from 'js-cookie';
import { signInWithPopup, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { useUserContext } from '../../userContext/UserContextProvider';
import { motion } from 'framer-motion';

const UserLogin = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const set = useUserContext().setUser;
  const navigate = useNavigate();

  useEffect(() => {
    function check() {
      if (auth.currentUser) {
        console.log('Signing out');
        signOut(auth);
      }
    }
    check();
    scrollTo({top:0,behavior:'smooth'})
  }, []);

  const handleLogin = (p) => {
    p.preventDefault();
    if (!user.email || user.email === '') {
      setErrors({ ...errors, email: 'Email is required' });
    }
    if (!user.password || user.password === '') {
      setErrors({ ...errors, password: 'Password is required' });
    }
    if (!user.email || !user.password) return;

    signInWithEmailAndPassword(auth, user.email, user.password)
      .then(async (userCredential) => {
        Cookies.set('user', JSON.stringify(userCredential.user), { expires: 7 });
        navigate('/verification');
      })
      .catch(() => {
        setErrors({ ...errors, authError: 'Invalid email or password' });
      });
  };

  const handleGoogleSignIn = () => {
    let flag = false;
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        Cookies.set('user', JSON.stringify(result.user), { expires: 7 });

        await fetch(`http://localhost:5000/isRegistered`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: result.user.email }),
        })
          .then((res) => res.json())
          .then((response) => {
            if (response.status) {
              flag = true;
              navigate('/verification/requestPending');
            } else {
              navigate('/verification');
            }
          });

        if (!flag && result.user.metadata.creationTime === result.user.metadata.lastSignInTime) {
          fetch('http://localhost:5000/storeUserAuthInDb', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: result.user.email,
              creationDateTime: result.user.metadata.creationTime,
            }),
          });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center w-full items-center min-h-screen bg-gradient-to-br from-blue-300 to-blue-500"
    >
      <form className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <motion.h2
          className="text-3xl font-extrabold text-center mb-6 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Welcome Back
        </motion.h2>
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            id="email"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </motion.div>
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <label htmlFor="password" className="block text-gray-700 mb-1">
            Password
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            id="password"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </motion.div>
        {errors.authError && (
          <motion.p
            className="text-red-500 text-sm text-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            {errors.authError}
          </motion.p>
        )}
        <motion.input
          type="submit"
          value="Login"
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg cursor-pointer mb-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        />
        <motion.button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continue with Google
        </motion.button>
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <span className="text-gray-600">New to the app?</span>
          <Link to="/register/user" className="ml-2 text-blue-600 font-bold hover:underline">
            Register
          </Link>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default UserLogin;
