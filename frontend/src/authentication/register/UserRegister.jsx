import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../userContext/UserContextProvider';
import { auth } from '../../config/firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { googleProvider } from '../../config/firebase-config';

const UserRegister = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [errors, setErrors] = React.useState({});
    const { user, setUser } = useUserContext()
    const navigate = useNavigate()

    const sendToDatabase = (user) => {
        fetch('http://localhost:5000/storeUserInDb', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user ? {
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                creationDate: user.metadata.creationTime,
                lastSignInDate: user.metadata.lastSignInTime
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
         
        }).catch((error) => {
            console.log("enable to send data to database", error.message)
        })

    }
    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                console.log(result.user);
                setUser({ ...user, ...result.user })
                sendToDatabase(result.user)  // to send date to database
                navigate('/verification')
            }).catch((error) => {
                console.log(error)
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
            setUser({ ...user, email, password });
            sendToDatabase()
            navigate('/verification')
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