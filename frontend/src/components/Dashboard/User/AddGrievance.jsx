import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
const AddGrievance = () => {
    const [title, setTitle] = useState('');
    const navigate=useNavigate()
    const [complainType, setComplainType] = useState('');
    const [description, setDescription] = useState('');
    const [user, setUser] = useState()
    useEffect(() => {
        const c = JSON.parse(Cookies.get('user'))
        if (c) {
            setUser(c)
            console.log("user found");
        }
        else {
            alert('login firset')
            navigate('/login/user')
        }
    },[])
    const handleSubmit = (e) => {
        e.preventDefault();
        const grievance = {
            complainType,
            description,
            hostelId:user.hostelId,
            dateTime: new Date(),
            complainStatus: 'Pending'
        };
        console.log(grievance);
        
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6"><div>
                <label className="block text-sm font-medium text-gray-700">Complain Type:</label>
                <select
                    value={complainType}
                    onChange={(e) => setComplainType(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="">Select Type</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Cleanliness">Cleanliness</option>
                    <option value="Electricity">Electricity</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Other">Other</option>
                </select>
            </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={complainType === 'Other' ? title : complainType}
                        onChange={(e) => setTitle(e.target.value)}
                        required={complainType === 'Other'}
                        disabled={complainType !== 'Other'}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
            </form>
        </div>

    );
};

export default AddGrievance;