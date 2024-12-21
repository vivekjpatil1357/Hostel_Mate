import React from 'react';
import { Link } from 'react-router-dom';

const IntroBody = () => {
    return (
        <div className='flex items-center justify-center  w-full'>
        <div className="flex  items-center justify-center ">
            <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-slate-100 shadow-slate-400 shadow-lg rounded-lg ">
                <Link to="/login/user">
                    <button className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
                        User Login
                    </button>
                </Link>
                <Link to="/login/admin">
                    <button className="w-full sm:w-auto px-6 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900">
                        Admin Login
                    </button>
                </Link>
            </div>
        </div>
        </div>
    );
};

export default IntroBody;
